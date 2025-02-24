import React, { useState } from "react";
import "../css/headerUser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.JPG"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { FiLogOut } from "react-icons/fi"; // Import icon đăng xuất
import { AiOutlineUser } from "react-icons/ai"; // Icon người dùng
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng từ Redux
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Lấy trạng thái đăng nhập
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleLogin = () => {
    // Chuyển đến trang Đăng nhập
    navigate("/dang-nhap");
  };
  const handleLogout = () => {
    dispatch(logoutUser()); // Đăng xuất và cập nhật Redux state
    navigate("/");  // Quay lại trang chủ
  };

  const handleRegister = () => {
    // Chuyển đến trang Đăng ký
    navigate("/Dang-ki");
  };

  return (
    <>
    <header className="header navbar navbar-expand-lg navbar-light bg-light shadow-sm">
  <div className="container-fluid">
    {/* Logo */}
    <a className="navbar-brand fw-bold fs-3" href="#">
      <img src={logo} alt="Logo" />
    </a>

    {/* Navbar Toggler for mobile */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded={isMenuOpen ? "true" : "false"}
      onClick={toggleMenu}
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navbar menu */}
    <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
      <ul className="navbar-nav mx-auto">
        {/* Main Menu Items */}
        <li className="nav-item">
          <Link className="nav-link" to="/trang-chu">
            TRANG CHỦ
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/order">
            ĐƠN HÀNG
          </Link>
        </li>
      </ul>

      {/* User menu and search icons */}
      <div className="d-flex align-items-center">
        <div className="d-flex">
          {/* User profile dropdown */}
          <div className="dropdown">
            <div className="d-flex align-items-center">
              {isLoggedIn ? (
                <div className="d-flex">
                  <span className="navbar-text me-3">Xin chào, {user.name}</span>
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
    <FiLogOut size={20} /> {/* Icon đăng xuất */}
</button>
                </div>
              ) : (
                <button className="btn btn-outline-primary me-2" type="button" onClick={handleLogin}>
                <AiOutlineUser size={20} /> {/* Icon người dùng */}
            </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

     
    </>
  );
};

export default Header;
