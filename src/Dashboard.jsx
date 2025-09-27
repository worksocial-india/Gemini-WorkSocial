import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, LineChart, Compass, Home, CreditCard, Shield, Receipt, TrendingUp, BookOpen, GraduationCap, Tag, Handshake, Users, Phone, Construction } from "lucide-react";
import "./Dashboard.css";

function CardArt({ icon, imgSrc, alt }) {
  const Icon = icon;
  return (
    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white grid place-items-center shadow-sm overflow-hidden">
      {imgSrc ? (
        <img src={imgSrc} alt={alt} className="h-full w-full object-cover bg-white" />
      ) : (
        <Icon className="h-6 w-6" aria-hidden />
      )}
    </div>
  );
}

function Dashboard() {
  const [showCta, setShowCta] = useState(false);
  // Hero section configurations

  useEffect(() => {
    const ctaTimer = setTimeout(() => {
      setShowCta(true);
    }, 5000);
    
    return () => {
      clearTimeout(ctaTimer);
    };
  }, []);

  const cards = [
    {
      title: "Under Construction",
      href: "/calculators/emi",
      desc: "Check our upcoming features and services.",
      icon: Construction,
      imgSrc: "",
    },
    {
      title: "Financial Calculators",
      href: "/calculators/emi",
      desc: "EMI, Eligibility, SIP, and other financial calculators.",
      icon: Calculator,
      imgSrc: "/EMI-calculator.png",
    },
    {
      title: "Investment Tools",
      href: "/calculators/emi",
      desc: "SIP, Lumpsum, CAGR/XIRR, Goal planning, Retirement.",
      icon: LineChart,
      imgSrc: "",
    },
    {
      title: "Travel",
      href: "/calculators/emi",
      desc: "Itineraries, budgets, forex, visa checklists, hacks.",
      icon: Compass,
      imgSrc: "",
    },
    {
      title: "Property (Realty)",
      href: "/calculators/emi",
      desc: "Valuation notes, LTV, registry fees, stamp duty, due diligence.",
      icon: Home,
      imgSrc: "",
    },
    {
      title: "Loans Desk",
      href: "/calculators/emi",
      desc: "Home, LAP, BT+Top‑Up, Personal, Auto—offers and docs.",
      icon: CreditCard,
      imgSrc: "",
    },
    {
      title: "Insurance",
      href: "/calculators/emi",
      desc: "Term, Health, Motor—indicative quotes and checklists.",
      icon: Shield,
      imgSrc: "",
    },
    {
      title: "Tax Tools (India)",
      href: "/calculators/emi",
      desc: "New/Old regime, HRA, TDS, GST basics, Section‑80 series.",
      icon: Receipt,
      imgSrc: "",
    },
    {
      title: "Credit Score & Eligibility",
      href: "/calculators/emi",
      desc: "Score basics, bureaus, FOIR, net‑take‑home calculators.",
      icon: TrendingUp,
      imgSrc: "",
    },
    {
      title: "Knowledge Hub",
      href: "/calculators/emi",
      desc: "Guides, FAQs, RBI norms, bank playbooks, templates.",
      icon: BookOpen,
      imgSrc: "",
    },
    {
      title: "Learning Path",
      href: "/calculators/emi",
      desc: "Step‑by‑step tracks for buyers, refinancers, and DSAs.",
      icon: GraduationCap,
      imgSrc: "",
    },
    {
      title: "Deals & Referrals",
      href: "/calculators/emi",
      desc: "Partner offers, affiliate links, curated buying guides.",
      icon: Tag,
      imgSrc: "",
    },
    {
      title: "Partner With Us",
      href: "/calculators/emi",
      desc: "Banks, DSAs, builders—collab intake and SLAs.",
      icon: Handshake,
      imgSrc: "",
    },
    {
      title: "Community",
      href: "/calculators/emi",
      desc: "Forum, AMA with ‘Arsira – The Banker’, events.",
      icon: Users,
      imgSrc: "",
    },
    {
      title: "Book a 15‑min Call",
      href: "/calculators/emi",
      desc: "WhatsApp-first, zero‑spam. Slots in IST.",
      icon: Phone,
      imgSrc: "",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Hero */}
      <section className="dashboard-hero-section min-h-screen -mt-16 relative">
        {/* Semi-transparent overlay to ensure content visibility */}
        <div className="absolute inset-0 bg-slate-900/10 z-0"></div>
        <div className="flex flex-col md:flex-row h-full min-h-screen items-stretch relative z-10">
          <div className="w-full md:w-1/3 p-4"></div>
          <div className="w-full md:w-1/3 p-4 flex items-start justify-center">
            <div className="w-full h-1/2">
              <div className="bg-transparent p-4 rounded-lg">
                <h2
                  className="text-6xl font-extrabold text-center mb-2 text-green-900"
                  style={{ WebkitTextStroke: "1px #172554" }}
                >
                  From a Small Seed, We Nurture Your Dreams into a Secure Future
                </h2>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p className="text-3xl font-bold text-center">
                  Rooted in Trust, Growing with You.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4"></div>
        </div>
      </section>

      {/* Cards */}
      <section id="cards" className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold">How it works</h2>
          <ol className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-700">
            <li className="rounded-xl md:rounded-2xl border border-slate-200 p-3 md:p-4 bg-slate-50 flex items-center">
              <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs flex-shrink-0">1</span>
              <span>Pick a tool or page</span>
            </li>
            <li className="rounded-xl md:rounded-2xl border border-slate-200 p-3 md:p-4 bg-slate-50 flex items-center">
              <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs flex-shrink-0">2</span>
              <span>Enter details. Get instant outputs</span>
            </li>
            <li className="rounded-xl md:rounded-2xl border border-slate-200 p-3 md:p-4 bg-slate-50 flex items-center">
              <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs flex-shrink-0">3</span>
              <span>Save as PDF or share on WhatsApp</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Lead capture */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold">Get a free eligibility snapshot</h2>
          <form className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
            <input className="rounded-xl md:rounded-2xl border border-slate-300 px-3 py-2" placeholder="Name" />
            <input className="rounded-xl md:rounded-2xl border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
            <input className="rounded-xl md:rounded-2xl border border-slate-300 px-3 py-2" placeholder="WhatsApp (required)" required />
            <button className="rounded-xl md:rounded-2xl bg-slate-900 text-white px-4 py-2 hover:bg-slate-800">Send</button>
          </form>
          <p className="mt-2 text-xs text-slate-500">No spam. India‑first calcs. You can opt out anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">© {new Date().getFullYear()} WorkSocial India • Clarity for borrowers</div>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="https://wa.me/918882371688" className="hover:underline">WhatsApp</a>
            <a href="mailto:hello@worksocial.org" className="hover:underline">Email</a>
            <a href="/privacy" className="hover:underline">Privacy & Disclaimers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;