import React, { useEffect, useState } from "react";
import { CartProvider } from "../context/CartContext";
import { ProductList } from "../Components/ProductList";
import { Cart } from "../Components/Cart";
import { SearchBar } from "../Components/SearchBar";
import { CheckoutForm } from "../Components/CheckoutForm";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4700/store")
        .then((res) => {
          setProducts(res.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
    getData();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckout = () => {
    setIsCheckout(true);
    setIsCartOpen(false);
  };

  if (isCheckout) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <button
              onClick={() => setIsCheckout(false)}
              className="mb-6 text-blue-500 hover:text-blue-600 flex items-center gap-2"
            >
              ← Back to Shopping
            </button>
            <CheckoutForm />
          </div>
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">PILL-STORE</h1>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingCart size={24} />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <div className="flex gap-8">
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No products found matching your search.
                  </p>
                </div>
              ) : (
                <ProductList
                  products={filteredProducts}
                  onCheckout={handleCheckout}
                />
              )}
            </div>

            {isCartOpen && (
              <div className="w-96 bg-gray-50 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
                <Cart onCheckout={handleCheckout} />
              </div>
            )}
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
