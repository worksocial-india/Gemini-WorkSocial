import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="rounded-md mb-4" />
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
      <div className="flex items-center justify-end">
        <a href="#" className="text-blue-600 hover:underline">
          View Details →
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
