import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "./components/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Cart = lazy(() => import("./pages/Cart"));
const UserInfo = lazy(() => import("./pages/UserInfo"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/details/:bookId" element={<BookDetails />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/cart" element={<Cart />} />
          {isLogin && <Route path="/user" element={<UserInfo />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
