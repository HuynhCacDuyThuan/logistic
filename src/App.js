import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./user/Home";
import RegistrationPage from "./user/RegistrationPage";
import LoginPage from "./user/LoginPage";
import PricingTable from "./user/PricingTable";
import ServicesPage from "./user/ServicesPage";
import ForgotPasswordPage from "./user/ForgotPasswordPage";
import AdminPage from "./admin/AdminPage";
import AddPostPage from "./admin/AddPostPage";
import PostDetail from "./user/PostDetail";
import EditPostPage from "./admin/EditPostPage";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Trang-chu" element={<Home />} />
        <Route path="/Dang-ki" element={<RegistrationPage />} />
        <Route path="/Dang-nhap" element={<LoginPage />} />
        <Route path="/Bang-gia" element={<PricingTable />} />
        <Route path="/Dich-vu" element={<ServicesPage />} />
        <Route path="/Quen-mat-khau" element={<ForgotPasswordPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/posts/add" element={<AddPostPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/admin/posts/edit/:id" element={<EditPostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
