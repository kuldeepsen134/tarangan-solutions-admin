import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import Users from "./pages/Users/Users";
import CreateUser from "./pages/Users/CreateUser";
import UpdateUser from "./pages/Users/UpdateUser";
import CreateFood from "./pages/food/CreateFood";
import Foods from "./pages/food/Foods";
import Categories from "./pages/Categories/Categories";
import CreateCategories from "./pages/Categories/CreateCategories";
import UserSingle from "./pages/Users/userSingle";
import UpdateFood from "./pages/food/UpdateFood";
const App = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/usersingle/:id" element={<UserSingle />} />
          <Route path="/foods" element={<Foods />} />
  
          <Route path="/categories" element={<Categories />} />
          <Route path="/createusers" element={<CreateUser />} />
          <Route path="/createcategories" element={<CreateCategories />} />
          <Route path="/createfoods" element={<CreateFood />} />
          <Route path="/updateusers/:id" element={<UpdateUser />} />
          <Route path="/updatefood/:id" element={<UpdateFood />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
