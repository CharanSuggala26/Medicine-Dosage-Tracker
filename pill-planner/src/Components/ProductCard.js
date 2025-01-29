import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart, CreditCard } from "lucide-react";

export function ProductCard({ product, onCheckout }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2 text-xl font-bold text-green-600">
          ${product.price.toFixed(2)}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
          <button
            onClick={() => {
              handleAddToCart();
              onCheckout();
            }}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
