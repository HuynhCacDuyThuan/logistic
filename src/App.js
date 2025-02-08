import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./user/Home";
import RegistrationPage from "./user/RegistrationPage";
import LoginPage from "./user/LoginPage";
import PricingTable from "./user/PricingTable";
import ServicesPage from "./user/ServicesPage";
import ForgotPasswordPage from "./user/ForgotPasswordPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Trang-chủ" element={<Home />} />
        <Route path="/Dang-ki" element={<RegistrationPage />} />
        <Route path="/Dang-nhap" element={<LoginPage />} />
        <Route path="/Bang-gia" element={<PricingTable />} />
        <Route path="/Dich-vu" element={<ServicesPage />} />
        <Route path="/Quen-mat-khau" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
