import React from "react";
import { Calculator, LineChart, Compass, Home, CreditCard, Shield, Receipt, TrendingUp, BookOpen, GraduationCap, Tag, Handshake, Users, Phone } from "lucide-react";

function CardArt({ icon: IconComponent, imgSrc, alt }) {
  return (
    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white grid place-items-center shadow-sm overflow-hidden">
      {imgSrc ? (
        <img src={imgSrc} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <IconComponent className="h-6 w-6" aria-hidden />
      )}
    </div>
  );
}

function WorkSocialLanding() {
  // Drop 1:1 PNG/JPGs into /public/art and set imgSrc below to replace icons
  const cards = [
    {
      title: "Financial Calculators",
      href: "/calculators/finance",
      desc: "EMI, Eligibility, Part‑Payment, Balance Transfer, Amortization.",
      icon: Calculator,
      imgSrc: "", // e.g. "/art/finance.png"
    },
    {
      title: "Investment Calculators",
      href: "/calculators/investment",
      desc: "SIP, Lumpsum, CAGR/XIRR, Goal planning, Retirement.",
      icon: LineChart,
      imgSrc: "",
    },
    {
      title: "Travel",
      href: "/travel",
      desc: "Itineraries, budgets, forex, visa checklists, hacks.",
      icon: Compass,
      imgSrc: "",
    },
    {
      title: "Property (Realty)",
      href: "/property",
      desc: "Valuation notes, LTV, registry fees, stamp duty, due diligence.",
      icon: Home,
      imgSrc: "",
    },
    {
      title: "Loans Desk",
      href: "/loans",
      desc: "Home, LAP, BT+Top‑Up, Personal, Auto—offers and docs.",
      icon: CreditCard,
      imgSrc: "",
    },
    {
      title: "Insurance",
      href: "/insurance",
      desc: "Term, Health, Motor—indicative quotes and checklists.",
      icon: Shield,
      imgSrc: "",
    },
    {
      title: "Tax Tools (India)",
      href: "/tax",
      desc: "New/Old regime, HRA, TDS, GST basics, Section‑80 series.",
      icon: Receipt,
      imgSrc: "",
    },
    {
      title: "Credit Score & Eligibility",
      href: "/credit",
      desc: "Score basics, bureaus, FOIR, net‑take‑home calculators.",
      icon: TrendingUp,
      imgSrc: "",
    },
    {
      title: "Knowledge Hub",
      href: "/knowledge",
      desc: "Guides, FAQs, RBI norms, bank playbooks, templates.",
      icon: BookOpen,
      imgSrc: "",
    },
    {
      title: "Learning Path",
      href: "/learn",
      desc: "Step‑by‑step tracks for buyers, refinancers, and DSAs.",
      icon: GraduationCap,
      imgSrc: "",
    },
    {
      title: "Deals & Referrals",
      href: "/deals",
      desc: "Partner offers, affiliate links, curated buying guides.",
      icon: Tag,
      imgSrc: "",
    },
    {
      title: "Partner With Us",
      href: "/partners",
      desc: "Banks, DSAs, builders—collab intake and SLAs.",
      icon: Handshake,
      imgSrc: "",
    },
    {
      title: "Community",
      href: "/community",
      desc: "Forum, AMA with ‘Arsira – The Banker’, events.",
      icon: Users,
      imgSrc: "",
    },
    {
      title: "Book a 15‑min Call",
      href: "/contact",
      desc: "WhatsApp-first, zero‑spam. Slots in IST.",
      icon: Phone,
      imgSrc: "",
    },
  ];

  const quickPicks = [
    { label: "Home‑Loan EMI", href: "/calculators/finance/emi" },
    { label: "Eligibility by Income", href: "/calculators/finance/eligibility-income" },
    { label: "Eligibility by Property (LTV)", href: "/calculators/finance/eligibility-ltv" },
    { label: "Part‑Payment Impact", href: "/calculators/finance/part-payment" },
    { label: "SIP Calculator", href: "/calculators/investment/sip" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center text-lg shadow">WS</div>
            <div className="font-semibold">WorkSocial India</div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#cards" className="hover:underline">Explore</a>
            <a href="/calculators/finance" className="hover:underline">Calculators</a>
            <a href="/knowledge" className="hover:underline">Knowledge</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Welcome to WorkSocial India</h1>
            <p className="mt-3 text-slate-600 max-w-prose">
              Advisory, calculators, and playbooks built for India. Navigate home loans, investments, property, and travel with clarity.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="/calculators/finance" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium shadow-sm bg-slate-900 text-white hover:bg-slate-800">
                Open Calculators
              </a>
              <a href="/contact" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium shadow-sm bg-white border border-slate-200 hover:bg-slate-50">
                Book a 15‑min Call
              </a>
            </div>
            {/* Quick picks */}
            <div className="mt-6 flex flex-wrap gap-2">
              {quickPicks.map((q) => (
                <a key={q.href} href={q.href} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs hover:bg-slate-50 shadow-sm">
                  {q.label}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white shadow-sm border border-slate-200 p-5">
            <div className="aspect-[16/10] w-full rounded-2xl grid place-items-center text-center text-sm text-slate-500 border border-dashed">
              Hero Graphic Placeholder
              <div className="text-xs">Replace with banner or illustration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section id="cards" className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <a key={c.title} href={c.href} className="group rounded-3xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow shadow-sm">
              <div className="flex items-start gap-3">
                <CardArt icon={c.icon} imgSrc={c.imgSrc} alt={`${c.title} graphic`} />
                <div>
                  <h3 className="text-lg font-semibold group-hover:underline">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="mt-3 grid md:grid-cols-3 gap-3 text-sm text-slate-700">
            <li className="rounded-2xl border border-slate-200 p-4 bg-slate-50">1. Pick a tool or page</li>
            <li className="rounded-2xl border border-slate-200 p-4 bg-slate-50">2. Enter details. Get instant outputs</li>
            <li className="rounded-2xl border border-slate-200 p-4 bg-slate-50">3. Save as PDF or share on WhatsApp</li>
          </ol>
        </div>
      </section>

      {/* Lead capture */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Get a free eligibility snapshot</h2>
          <form className="mt-3 grid md:grid-cols-4 gap-3 text-sm">
            <input className="rounded-2xl border border-slate-300 px-3 py-2" placeholder="Name" />
            <input className="rounded-2xl border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
            <input className="rounded-2xl border border-slate-300 px-3 py-2" placeholder="WhatsApp (required)" required />
            <button className="rounded-2xl bg-slate-900 text-white px-4 py-2 hover:bg-slate-800">Send</button>
          </form>
          <p className="mt-2 text-xs text-slate-500">No spam. India‑first calcs. You can opt out anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} WorkSocial India • Clarity for borrowers</div>
          <div className="flex gap-4">
            <a href="https://wa.me/919808462032" className="hover:underline">WhatsApp</a>
            <a href="mailto:vipinnegi78200@gmail.com" className="hover:underline">Email</a>
            <a href="/privacy" className="hover:underline">Privacy & Disclaimers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WorkSocialLanding;