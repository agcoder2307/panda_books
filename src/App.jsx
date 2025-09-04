import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import BookDetails from "./pages/BookDetails";
import UserInfo from "./pages/UserInfo";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/details" element={<BookDetails />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/user" element={<UserInfo />} />
      </Routes>
    </div>
  );
};

export default App;
