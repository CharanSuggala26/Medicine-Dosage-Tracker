import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

export function Cart({ onCheckout }) {
  const { state, dispatch } = useCart();

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = async (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
        <p className="text-gray-400 text-sm">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 space-y-4 overflow-y-auto px-4 sm:px-0">
        {state.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg transition-all duration-200 hover:bg-gray-100"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                ${item.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
      <div className="sticky bottom-0 bg-white p-4 sm:p-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-semibold text-gray-900">Total:</span>
          <span className="text-lg font-bold text-gray-900">
            ${state.total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Proceed to checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;