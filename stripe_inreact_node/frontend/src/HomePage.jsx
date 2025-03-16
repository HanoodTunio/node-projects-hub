import React, { useState } from "react";
import "./App.css";

function HomePage() {
  const itemName = "FIREIMG";
  const itemPrice = 1000.0;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(itemPrice);

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    setTotalPrice((prevTotal) =>
      quantity > 1 ? prevTotal - itemPrice : itemPrice
    );
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setTotalPrice((prevTotal) => prevTotal + itemPrice);
  };

  const checkOut = async () => {
    try {
      const response = await fetch("http://localhost:8080/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          items: [{ id: 1, name: itemName, quantity, price: totalPrice }],
        }),
      });
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">{itemName}</h1>
        <p className="text-lg font-semibold text-gray-700">
          Price: ${itemPrice.toFixed(2)}
        </p>

        <div className="flex items-center mt-4">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            -
          </button>
          <span className="mx-4 text-xl">{quantity}</span>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            +
          </button>
        </div>

        <p className="mt-4 text-lg font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </p>

        <button
          onClick={checkOut}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-md"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
