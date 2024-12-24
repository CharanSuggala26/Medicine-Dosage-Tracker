import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export function Cart({ onCheckout }) {
  const { state, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="font-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-xl">${state.total.toFixed(2)}</span>
        </div>
        <button 
          onClick={onCheckout}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;