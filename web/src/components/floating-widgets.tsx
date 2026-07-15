"use client";

import { useEffect, useRef, useState } from "react";
import { inr } from "@/lib/data";
import type { SiteSettings, Service, Package } from "@/lib/data";
import { whatsappLink, buildEnquiryMessage } from "@/lib/whatsapp";
import { WhatsAppIcon, ChatIcon, CloseIcon, ArrowRightIcon } from "./icons";

type Msg = { from: "bot" | "user"; text: string };

type BotContext = {
  site: SiteSettings;
  services: Service[];
  packages: Package[];
};

const QUICK_REPLIES = ["What services do you offer?", "CCTV packages", "Pricing", "Talk to a human"];

function botReply(input: string, { site, services, packages }: BotContext): string {
  const q = input.toLowerCase();

  if (/(hi|hello|hey|vanakkam)/.test(q)) {
    return "Hi there! 👋 I can help you explore our services, packages and prices. What are you looking for?";
  }
  if (/(human|agent|talk|call|support|contact)/.test(q)) {
    return "Sure — tap the green “Talk to us on WhatsApp” button below and our team will help you personally. 😊";
  }
  if (/(service|offer|provide|do you)/.test(q)) {
    return (
      "We provide:\n" +
      services.map((s) => `• ${s.title}`).join("\n") +
      "\n\nWhich one would you like to know more about?"
    );
  }
  if (/cctv|camera|security/.test(q)) {
    const p = packages.filter((x) => x.serviceSlug === "cctv-installation");
    return (
      "We offer CCTV installation in 4 packages:\n" +
      p.map((x) => `• ${x.name} — from ${inr(x.price)}`).join("\n") +
      "\n\nAll include free installation and warranty. Want a free site survey?"
    );
  }
  if (/biometric|fingerprint|face|attendance|access|lock/.test(q)) {
    return "Our biometric & access control starts from ₹4,999 — fingerprint, face recognition and smart door locks with attendance reports. Shall I connect you for a quote?";
  }
  if (/laptop|computer|desktop|repair|ram|ssd|slow/.test(q)) {
    return "We repair and upgrade laptops & desktops from ₹499 — RAM/SSD upgrades, software setup and doorstep service available. What's the issue you're facing?";
  }
  if (/network|cable|cat6|cat5|ups|electrical|wiring/.test(q)) {
    return "We handle networking, CAT5/CAT6 cabling, UPS and electrical site works from ₹1,999. Want us to survey your site?";
  }
  if (/home|automation|smart|switch|gate|light/.test(q)) {
    return "Home automation starts from ₹2,499 — smart switches, lighting, gate automation and app/voice control. Which room would you like to start with?";
  }
  if (/price|cost|rate|quote|charge|how much/.test(q)) {
    return (
      "Here's where each service starts:\n" +
      services.map((s) => `• ${s.title}: from ${inr(s.startingPrice)}`).join("\n") +
      "\n\nFinal pricing depends on your site — we offer a free survey. Want to book one?"
    );
  }
  if (/(location|where|address|chennai|area)/.test(q)) {
    return `We're based in ${site.city} and serve the whole city. ${site.hours}.`;
  }
  return "I'll connect you with our team for that. 🙌 Tap “Talk to us on WhatsApp” below and we'll help you right away.";
}

export function FloatingWidgets({ site, services, packages }: BotContext) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I'm the Uranus assistant. 🤖 Ask me about our services, CCTV packages or pricing.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, chatOpen]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text: clean }]);
    // Tiny delay so the reply feels conversational.
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "bot", text: botReply(clean, { site, services, packages }) },
      ]);
    }, 350);
  };

  const escalationLink = () => {
    const history = messages
      .map((m) => `${m.from === "bot" ? "Bot" : "Me"}: ${m.text}`)
      .join("\n");
    return whatsappLink(
      {
        requirement: buildEnquiryMessage().includes("Requirement")
          ? `Continuing my chat:\n${history}`
          : history,
      },
      site.whatsappNumber,
    );
  };

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-4 z-50 w-[min(92vw,22rem)] origin-bottom-right transition-all duration-300 sm:right-6 ${
          chatOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="flex h-[28rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <ChatIcon className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Uranus Assistant</p>
                <p className="flex items-center gap-1 text-[11px] text-brand-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Online now
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-sm bg-brand-600 text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr}
                  onClick={() => send(qr)}
                  className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-50"
                >
                  {qr}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white p-2.5">
            <a
              href={escalationLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="chatbot_escalation"
              className="mb-2 flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Talk to us on WhatsApp
            </a>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-700"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating buttons */}
      <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
        <button
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Open chat assistant"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition-all hover:scale-110 hover:bg-brand-800 active:scale-95"
        >
          {chatOpen ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
        </button>
        <a
          href={whatsappLink({}, site.whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-110 active:scale-95 animate-pulse-ring"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </div>
    </>
  );
}
