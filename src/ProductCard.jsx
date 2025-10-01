import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const FALLBACK_IMAGE = '/images/homeloan-calculator.jpg';

function ProductCard({ product }) {
  const { name, description, image, status, link } = product;
  const imageSrc = useMemo(() => image || FALLBACK_IMAGE, [image]);

  const Action = () => {
    if (status === 'coming-soon') {
      return (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
          Coming Soon
        </span>
      );
    }

    if (link) {
      return (
        <Link
          to={link}
          className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700"
        >
          Calculate Now <span aria-hidden="true">&gt;</span>
        </Link>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 opacity-70">
        View Details
      </span>
    );
  };

  return (
    <article className="group flex h-full min-h-[410px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-[286px] w-full overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(event) => {
            if (event.currentTarget.src !== FALLBACK_IMAGE) {
              event.currentTarget.src = FALLBACK_IMAGE;
            }
          }}
        />
        {status === 'coming-soon' && (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Upcoming
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <header>
          <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </header>

        <div className="mt-auto flex justify-end">
          <Action />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;






