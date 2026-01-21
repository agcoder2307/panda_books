import { useEffect, useState } from "react";
import Header from "../components/Header";
import { colors } from "../constants/colors";
import { bookService } from "../services/bookService";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { cartService } from "../services/cartService";
import { notification } from "antd";
import { addToCount } from "../app/cartSlice";
const CartPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const countItems = useSelector((state) => state.cartItems.items);
  const openNotificationWithIcon = (type) => {
    api[type]({
      title: "Success",
      description: `You successfully deleted items from cart`,
    });
  };
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

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    cartService.getCarts().then((res) => setData(res.data));
  }, []);

  const deleteBook = async (id, quantity) => {
    const body = {
      productId: id,
      quantity,
    };
    await cartService.removeItemFromCart(body);
    openNotificationWithIcon("success");
    cartService.getCarts().then((res) => {
      setData(res.data);
      dispatch(addToCount(res.data.products?.length));
    });
  };
  console.log({ data });
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      {contextHolder}
      <div className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>
        {countItems === 0 && (
          <h1 className="text-3xl font-bold mb-8 text-black">is empty</h1>
        )}
        <div className="w-full max-w-4xl space-y-4">
          {data?.products?.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4"
            >
              <img
                src={"/book.jpg"}
                alt={item.product.name}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-black">
                  {item.product.name}
                </h2>
                <p className="text-gray-600">Price: ${item.product.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="font-bold mt-2">
                  Subtotal: ${item.product.price * item.quantity}
                </p>
              </div>
              <DeleteOutlined
                style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
                onClick={() => deleteBook(item.productId, item.quantity)}
              />
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl mt-8 bg-white p-6 shadow-md rounded-2xl">
          <div className="flex gap-3 items-center mb-4 text-black">
            <h2 className="text-2xl font-bold">Total:</h2>
            <p className="text-2xl font-bold">${totalPrice}</p>
          </div>
          <button
            className="w-full py-4 rounded-2xl text-lg hover:bg-[#105110] text-white shadow-lg transition-colors duration-300 checkout"
            style={{ bacgroundColor: colors.primary }}
            disabled={countItems === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
