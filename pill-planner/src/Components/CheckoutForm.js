import React from 'react';
import { useCart } from '../context/CartContext';

export function CheckoutForm() {
  const { state } = useCart();

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Checkout Details</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Street Address"
              className="w-full px-4 py-2 border rounded-md"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="State"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-bold">
                <span>Total Amount:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors font-semibold">
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default CheckoutForm;