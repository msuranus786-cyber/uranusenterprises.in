import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { getAdminSecret } from "./secret";

const COOKIE = "admin_session";

export async function authenticate(email: string, password: string) {
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  const token = await new SignJWT({ sub: user.id.toString(), role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getAdminSecret());

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getAdminSecret());
    return { id: Number(payload.sub), role: payload.role as string };
  } catch {
    return null;
  }
}

export async function logout() {
  (await cookies()).delete(COOKIE);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

/** For server actions: throws when the caller is not an authenticated admin. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") throw new Error("Unauthorized");
  return session;
}

/** For admin pages: redirects to the login page when unauthenticated.
 *  Defense-in-depth alongside the proxy.ts matcher. */
export async function requireAdminPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/admin/login");
  return session;
}
