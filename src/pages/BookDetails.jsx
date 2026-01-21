import { useEffect, useState } from "react";

import bookImg from "../assets/bookLang.jpg";
import Header from "../components/Header";
import { productService } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";
import { cartService } from "../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import { notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { addToCount } from "../app/cartSlice";
const BookDetails = () => {
  const token = useSelector((state) => state.auth.token);
  const params = useParams();
  const [bookDetail, setBookDetail] = useState({});
  const [bookAmount, setBookAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      title: "Success",
      description: `You successfully added items to cart`,
    });
  };
  const book = {
    name: "English Learning Book",
    description:
      "This book is designed for learners who want to improve their English skills with practical examples and exercises.",
    price: 50000,
    quantity: 12,
    images: [bookImg, bookImg, bookImg],
  };

  const addToCartAction = async () => {
    setIsLoading(true);
    if (token) {
      const body = {
        productId: params.bookId,
        quantity: Number(bookAmount),
      };

      await cartService.addToCart(body);
      openNotificationWithIcon("success");

      const res = await cartService.getCarts();
      dispatch(addToCount(res?.data?.products?.length));
    } else {
      navigate("/login");
    }
    setIsLoading(false);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    productService
      .getProductById(params.bookId)
      .then((res) => setBookDetail(res.data));
  }, []);
  return (
    <div className="bg-white min-h-screen">
      <Header />
      {contextHolder}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left side - Images and checkout */}
        <div className="flex flex-col items-center">
          <div className="w-full h-96 overflow-hidden rounded-2xl shadow-md">
            <img
              src={book.images[currentIndex]}
              alt={bookDetail.name}
              className="w-full h-96 object-cover transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Preview Thumbnails */}
          <div className="flex justify-center mt-4 space-x-3">
            {book.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {book.images?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            className="w-full bg-green-600 text-white py-3 mt-6 rounded-xl shadow-md hover:bg-green-700 transition"
            onClick={() => navigate("/cart")}
          >
            Checkout
          </button>
        </div>

        {/* Right side - Details */}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {bookDetail.name}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {bookDetail.description}
          </p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            Price: {bookDetail.price} UZS
          </p>
          <p className="text-gray-700 mb-6">In Stock: {bookDetail.quantity}</p>

          <div className="flex items-center space-x-4 mb-6">
            <label className="text-gray-700 font-medium">Amount:</label>
            <input
              type="number"
              min="1"
              max={bookDetail.quantity}
              value={bookAmount}
              onChange={(e) => setBookAmount(e.target.value)}
              defaultValue={1}
              className="w-20 px-3 text-black bg-white py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition"
            onClick={addToCartAction}
          >
            {isLoading ? (
              <Spin
                indicator={<LoadingOutlined style={{ color: "white" }} spin />}
                size="large"
              />
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
