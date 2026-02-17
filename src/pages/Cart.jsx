import { useEffect, useState } from "react";
import Header from "../components/Header";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { cartService } from "../services/cartService";
import { notification, Spin } from "antd";
import { addToCount } from "../app/cartSlice";
import CheckoutModal from "../components/CheckoutModal";
import { orderService } from "../services/orderService";
import { Navigate } from "react-router-dom";
import { formatMoney } from "../components/formatter";

const CartPage = () => {
  const countItems = useSelector((state) => state.cartItems.items);
  const token = useSelector((state) => state.auth.token);
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      title: "Success",
      description: `You successfully deleted items from cart`,
    });
  };
  const errorNotificationWithIcon = (type) => {
    api[type]({
      title: "Error",
      description: `Something went wrong`,
    });
  };

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const totalPrice =
    data?.products?.reduce(
      (total, item) => total + (item.product.price / 100) * item.quantity,
      0,
    ) ?? 0;

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

  const onOrder = () => {
    setIsOrderLoading(true);
    const orderBody = data?.products?.map((item, index) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    try {
      orderService.createOrder(orderBody).then((res) => {
        setOrderId(res?.data?.id);
      });
      showLoading();
      setIsOrderLoading(false);
    } catch (error) {
      errorNotificationWithIcon("error");
      setIsOrderLoading(false);
    }
  };

  return token ? (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      {contextHolder}
      <div className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-8 text-black">
          Your Cart {countItems === 0 && "is empty"}
        </h1>

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
                <p className="text-gray-600">
                  Price: {formatMoney(item.product.price / 100)} sum
                </p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="font-bold mt-2 text-gray-600">
                  Subtotal:{" "}
                  {formatMoney((item.product.price / 100) * item.quantity)} sum
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
            <p className="text-2xl font-bold">{formatMoney(totalPrice)} sum</p>
          </div>
          <button
            className="w-full py-4 rounded-2xl text-lg hover:bg-[#105110] text-white shadow-lg transition-colors duration-300 checkout"
            style={{ bacgroundColor: colors.primary }}
            disabled={countItems === 0}
            onClick={onOrder}
          >
            {isOrderLoading ? (
              <Spin
                indicator={<LoadingOutlined style={{ color: "white" }} spin />}
                size="large"
              />
            ) : (
              "Checkout"
            )}
          </button>

          <CheckoutModal
            loading={loading}
            open={open}
            setOpen={setOpen}
            orderId={orderId}
          />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default CartPage;
