import { useState } from "react";
import Header from "../components/Header";
import { colors } from "../constants/colors";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Book One",
      price: 20,
      quantity: 2,
      image: "/book.jpg",
    },
    {
      id: 2,
      title: "Book Two",
      price: 15,
      quantity: 1,
      image: "/book.jpg",
    },
  ]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>

        <div className="w-full max-w-4xl space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="font-bold mt-2">
                  Subtotal: ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl mt-8 bg-white p-6 shadow-md rounded-2xl">
          <div className="flex gap-3 items-center mb-4 text-black">
            <h2 className="text-2xl font-bold">Total:</h2>
            <p className="text-2xl font-bold">${totalPrice}</p>
          </div>
          <button
            className="w-full py-4 rounded-2xl text-lg hover:bg-[#105110] text-white shadow-lg transition-colors duration-300"
            style={{ bacgroundColor: colors.primary }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
