import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="rounded-md mb-4" />
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
      <div className="flex items-center justify-end">
        {product.status === 'coming-soon' ? (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Coming Soon</span>
        ) : product.link ? (
          <Link to={product.link} className="text-blue-600 hover:underline">
            Calculate Now →
          </Link>
        ) : (
          <a href="#" className="text-blue-600 hover:underline">
            View Details →
          </a>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
