import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { categories, companies } from "./data/companyData";

const placeholderSections = [
  {
    title: "Overview",
    description:
      "Add a concise introduction covering the company's legacy, core businesses, and position in the Indian financial ecosystem."
  },
  {
    title: "History & Milestones",
    description:
      "Document important milestones such as founding year, mergers, acquisitions, regulatory transitions, and landmark achievements."
  },
  {
    title: "Products & Services",
    description:
      "Break down major product lines, customer segments, and channel strategies (branch, digital, partner ecosystems)."
  },
  {
    title: "Leadership & Governance",
    description:
      "List key executives, board composition, governance framework, and notable leadership initiatives."
  },
  {
    title: "Financial Snapshot",
    description:
      "Curate recent financial highlights—assets under management, revenue, profit, capital adequacy, or key ratios (include source links)."
  },
  {
    title: "Strategic Priorities",
    description:
      "Summarize ongoing strategic programs, technology investments, sustainability goals, or market expansion plans."
  }
];

const CompanyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const company = companies.find((item) => item.slug === slug);

  const categoryMeta = useMemo(() => {
    if (!company) {
      return null;
    }
    return categories.find((category) => category.id === company.category) ?? null;
  }, [company]);

  const relatedCompanies = useMemo(() => {
    if (!company) {
      return [];
    }

    return companies
      .filter((item) => item.category === company.category && item.slug !== company.slug)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 8);
  }, [company]);

  if (!company) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 py-16">
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Profile coming soon</h1>
          <p className="mt-3 text-sm text-slate-500">
            We couldn't find the company you were looking for. Please return to the directory and try another profile.
          </p>
          <Link
            to="/banks"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
          >
            Back to Banks Directory
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-blue-500 hover:text-blue-600"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500">
            {company.logo && (
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <div className="relative -mb-16 flex h-32 w-32 items-center justify-center rounded-2xl bg-white shadow-lg">
                  <img src={company.logo} alt={`${company.name} logo`} className="h-20 w-20 object-contain" />
                </div>
              </div>
            )}
          </div>

          <div className="pt-20 pb-12 px-6 sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4 max-w-3xl">
                <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {categoryMeta ? categoryMeta.title : "BFSI"}
                </p>
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{company.name}</h1>
                <p className="text-base text-slate-600">{company.summary}</p>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    Official Website
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 10.5 21 3m0 0h-5.25M21 3v5.25M10.5 13.5 3 21m0 0h5.25M3 21v-5.25" />
                    </svg>
                  </a>
                )}
                <Link to="/banks" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600">
                  View All Companies
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {placeholderSections.map((section) => (
                <div key={section.title} className="rounded-2xl border border-slate-200 bg-white/60 p-6">
                  <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{section.description}</p>
                  <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-400">
                    Insert curated content, data tables, timelines, and references tailored for {company.name}.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedCompanies.length > 0 && (
          <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Explore peers in {categoryMeta ? categoryMeta.title.toLowerCase() : "this segment"}</h2>
              <Link to="/banks" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Return to directory
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCompanies.map((item) => (
                <Link
                  key={item.slug}
                  to={`/banks/${item.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-500 hover:bg-blue-50"
                >
                  {item.logo ? (
                    <img src={item.logo} alt={`${item.name} logo`} className="h-12 w-12 object-contain" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                      {item.name[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">{item.name}</p>
                    <p className="text-xs text-slate-500">View profile</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default CompanyDetail;
