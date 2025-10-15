import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import BookDetails from "./pages/BookDetails";
import UserInfo from "./pages/UserInfo";
import { useSelector } from "react-redux";
import Cart from "./pages/Cart";

const App = () => {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/details" element={<BookDetails />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/cart" element={<Cart />} />
        {isLogin && <Route path="/user" element={<UserInfo />} />}
      </Routes>
    </div>
  );
};

export default App;
