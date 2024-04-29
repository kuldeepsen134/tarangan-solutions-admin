import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import Users from "./pages/Users/Users";
import CreateFood from "./pages/product/CreateFood";
import Categories from "./pages/Categories/Categories";
import UserSingle from "./pages/Users/userSingle";
import UpdateFood from "./pages/product/UpdateFood";
import ProductPage from "./pages/product/Product";
import BrandPage from "./pages/product/Brand";
import OrderPage from "./pages/order/Order";
const App = () => {
  // const token = localStorage.getItem("token");
  // const isAuthenticated = !!token;
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          

          <Route path="/updatefood/:id" element={<UpdateFood />} />

          <Route path="/users" element={<Users />} />
          <Route path="/usersingle/:id" element={<UserSingle />} />
          
          
          <Route path="/products" element={<ProductPage />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/orders" element={<OrderPage />} />


          <Route path="/categories" element={<Categories />} />

          <Route path="/createfoods" element={<CreateFood />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
