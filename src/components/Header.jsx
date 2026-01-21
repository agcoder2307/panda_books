import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../constants/colors";
import logoWhite from "../assets/logoWhite.png";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { cartService } from "../services/cartService";
import { addToCount } from "../app/cartSlice";
const Header = ({ isNotFound = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogin } = useSelector((state) => state.auth);
  const countItems = useSelector((state) => state.cartItems.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = {
    name: "Joshua",
    email: "abc@mail",
  };

  useEffect(() => {
    cartService
      .getCarts()
      .then((res) => dispatch(addToCount(res.data?.products?.length)));
  }, []);

  return (
    <header
      className={`shadow-md sticky top-0 z-50 ${
        menuOpen ? "" : "wavy-bottom"
      } py-3`}
      style={{ backgroundColor: colors.primary }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to={"/"}>
          <img src={logoWhite} alt="logo" height={60} width={120} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {!isNotFound && (
            <>
              <a href="#about" className=" text-white hover:text-gray-600">
                About
              </a>
              <a href="#books" className=" text-white hover:text-gray-600">
                Books
              </a>
              <a href="#slideshow" className=" text-white hover:text-gray-600">
                Slideshow
              </a>
              <a href="#video" className=" text-white hover:text-gray-600">
                Video
              </a>
              <a href="#contact" className=" text-white hover:text-gray-600">
                Contact
              </a>
            </>
          )}
          <Link to={isLogin ? "/user" : "/login"}>
            <button
              className="px-3 py-1.5 text-black rounded-lg shadow hover:bg-blue-200 transition"
              style={{ backgroundColor: "white" }}
            >
              {isLogin ? user.name : "Login"}
            </button>
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          {isLogin && (
            <div className="relative">
              <ShoppingCartOutlined
                style={{ color: "white", fontSize: "30px" }}
                onClick={() => navigate("/cart")}
              />
              {countItems !== 0 && (
                <span className="absolute top-[-10px] right-[-13px] bg-[red] px-[7px] rounded-[50%] text-white">
                  {countItems}
                </span>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
            style={{ color: "white", fontSize: "30px" }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden px-4 bg-gray-50 space-y-2 py-4 flex flex-col gap-3">
          <a href="#books" className="block text-gray-800 hover:text-[#34b51c]">
            Books
          </a>
          <a
            href="#slideshow"
            className="block text-gray-800 hover:text-[#34b51c]"
          >
            Slideshow
          </a>
          <a href="#video" className="block text-gray-800 hover:text-[#34b51c]">
            Video
          </a>
          <a
            href="#contact"
            className="block text-gray-800 hover:text-[#34b51c]"
          >
            Contact
          </a>
          <Link to={isLogin ? "/user" : "/login"}>
            <button
              className="px-3 py-1.5 mb-2 text-black rounded-lg shadow hover:bg-blue-200 transition"
              style={{ backgroundColor: "white" }}
            >
              {isLogin ? user.email : "Login"}
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
