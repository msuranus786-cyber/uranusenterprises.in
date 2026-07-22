-- CreateTable
CREATE TABLE "site_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL DEFAULT 'Uranus Enterprise',
    "brand" TEXT NOT NULL DEFAULT 'Ms.Uranus Nanofix',
    "owner" TEXT NOT NULL DEFAULT 'Mr. Bharath',
    "city" TEXT NOT NULL DEFAULT 'Chennai',
    "tagline" TEXT NOT NULL DEFAULT 'Chennai''s Trusted Technology & Security Partner',
    "phoneDisplay" TEXT NOT NULL DEFAULT '+91 98765 43210',
    "whatsappNumber" TEXT NOT NULL DEFAULT '919876543210',
    "email" TEXT NOT NULL DEFAULT 'support@shan.enterprises',
    "address" TEXT NOT NULL DEFAULT 'Chennai, Tamil Nadu, India',
    "hours" TEXT NOT NULL DEFAULT 'Mon – Sat · 9:30 AM – 8:00 PM',
    "yearsExperience" INTEGER NOT NULL DEFAULT 10,
    "customers" INTEGER NOT NULL DEFAULT 100,
    "projects" INTEGER NOT NULL DEFAULT 250,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "gradient" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startingPrice" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "features" TEXT[],
    "offerings" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cameras" TEXT NOT NULL,
    "recorder" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "installation" TEXT NOT NULL DEFAULT 'Included',
    "warranty" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceSlug" TEXT NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceSlug" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enquiries" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "location" TEXT,
    "requirement" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceSlug" TEXT,

    CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_serviceSlug_fkey" FOREIGN KEY ("serviceSlug") REFERENCES "services"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_serviceSlug_fkey" FOREIGN KEY ("serviceSlug") REFERENCES "services"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_serviceSlug_fkey" FOREIGN KEY ("serviceSlug") REFERENCES "services"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
