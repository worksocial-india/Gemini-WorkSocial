import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories, companies } from "./data/companyData";

const viewModes = {
  ALPHABETICAL: "alphabetical",
  CATEGORY: "category"
};

const letterOrder = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getInitials = (name) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0].toUpperCase())
    .join("");
};

const Banks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState(viewModes.ALPHABETICAL);

  const filteredCompanies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return companies;
    }

    return companies.filter((company) => {
      const haystack = [company.name, company.summary, company.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [searchTerm]);

  const companiesByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = filteredCompanies
        .filter((company) => company.category === category.id)
        .sort((a, b) => a.name.localeCompare(b.name));
      return acc;
    }, {});
  }, [filteredCompanies]);

  const companiesByLetter = useMemo(() => {
    const grouped = new Map(letterOrder.map((letter) => [letter, []]));
    grouped.set("#", []);

    filteredCompanies.forEach((company) => {
      const firstChar = company.name.charAt(0).toUpperCase();
      const key = letterOrder.includes(firstChar) ? firstChar : "#";
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key).push(company);
    });

    for (const [key, list] of grouped.entries()) {
      list.sort((a, b) => a.name.localeCompare(b.name));
      if (!list.length) {
        grouped.delete(key);
      }
    }

    return grouped;
  }, [filteredCompanies]);

  const renderCard = (company) => (
    <Link
      to={`/banks/${company.slug}`}
      key={company.slug}
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-32 items-center justify-center bg-slate-50">
        {company.logo ? (
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="h-20 w-20 object-contain transition group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-600">
            {getInitials(company.name)}
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
          {company.name}
        </p>
        <p className="text-xs text-slate-500 line-clamp-2">
          {company.summary}
        </p>
      </div>
    </Link>
  );

  const renderAlphabeticalView = () => (
    <div className="space-y-10">
      {[...companiesByLetter.entries()].map(([letter, list]) => (
        <section key={letter}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg font-bold text-blue-600">
              {letter}
            </div>
            <h2 className="text-lg font-semibold text-slate-800">{`${letter === "#" ? "Others" : letter} (${list.length})`}</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {list.map(renderCard)}
          </div>
        </section>
      ))}
    </div>
  );

  const renderCategoryView = () => (
    <div className="space-y-10">
      {categories.map((category) => {
        const entries = companiesByCategory[category.id] || [];
        if (!entries.length) {
          return null;
        }

        return (
          <section key={category.id}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                {category.title} <span className="text-sm font-normal text-slate-500">({entries.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {entries.map(renderCard)}
            </div>
          </section>
        );
      })}
    </div>
  );

  const resultsCount = filteredCompanies.length;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">BFSI Directory</p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore India's Banking & Financial Services Leaders
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-600">
            Browse through public and private sector banks, NBFCs, insurers, asset managers, and housing finance companies. Click a brand to open a dedicated profile page designed for detailed, Wikipedia-style coverage.
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.64 5.64a7.5 7.5 0 0 0 10.61 10.61Z" />
            </svg>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search companies, categories, or keywords"
              className="w-full border-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode(viewModes.ALPHABETICAL)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                viewMode === viewModes.ALPHABETICAL ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:text-blue-600"
              }`}
            >
              A-Z View
            </button>
            <button
              type="button"
              onClick={() => setViewMode(viewModes.CATEGORY)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                viewMode === viewModes.CATEGORY ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:text-blue-600"
              }`}
            >
              By Category
            </button>
          </div>
        </div>

        <p className="mb-6 text-sm text-slate-500">Showing {resultsCount} companies</p>

        {resultsCount === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-base font-semibold text-slate-700">No matches found</p>
            <p className="mt-2 text-sm text-slate-500">Try searching with a different keyword or reset the filters.</p>
          </div>
        ) : viewMode === viewModes.ALPHABETICAL ? (
          renderAlphabeticalView()
        ) : (
          renderCategoryView()
        )}
      </div>
    </section>
  );
};

export default Banks;

