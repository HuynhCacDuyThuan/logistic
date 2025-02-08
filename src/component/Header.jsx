import React, { useState } from "react";
import "../css/headerUser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleLogin = () => {
    // Chuyển đến trang Đăng nhập
    navigate("/Dang-nhap");
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
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZo55JX1AVUP-_7zEzA2ApcL6CXZL0_gWobQ&s" alt="" />
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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownOverview" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  TỔNG QUAN
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownOverview">
                  <li><a className="dropdown-item" href="/">Trang chủ</a></li>
       
                </ul>
              </li>
              <li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    id="navbarDropdownService"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    DỊCH VỤ
  </a>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdownService" data-bs-auto-close="true">
    <li><Link className="dropdown-item" to="/Dich-vu">Xem tất cả</Link></li>
    <li><Link className="dropdown-item" to="/submenu2">Submenu 2</Link></li>
  </ul>
</li>

              <li className="nav-item ">
                <a className="nav-link " href="/Bang-gia" >
                  BẢNG GIÁ
                </a>
               
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownPolicy" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  CHÍNH SÁCH
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownPolicy">
                  <li><a className="dropdown-item" href="#">Submenu 1</a></li>
                  <li><a className="dropdown-item" href="#">Submenu 2</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownGuide" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  HƯỚNG DẪN
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownGuide">
                  <li><a className="dropdown-item" href="#">Submenu 1</a></li>
                  <li><a className="dropdown-item" href="#">Submenu 2</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownNews" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  TIN TỨC - TUYỂN DỤNG
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownNews">
                  <li><a className="dropdown-item" href="#">Submenu 1</a></li>
                  <li><a className="dropdown-item" href="#">Submenu 2</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownChina" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  NGUỒN HÀNG TRUNG QUỐC
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownChina">
                  <li><a className="dropdown-item" href="#">Submenu 1</a></li>
                  <li><a className="dropdown-item" href="#">Submenu 2</a></li>
                </ul>
              </li>
            </ul>

            {/* User menu and search icons */}
            <div className="d-flex align-items-center">
             

              {/* Chat, Orders, Cart, and Profile buttons */}
              <div className="d-flex">
               

                {/* User profile dropdown */}
                <div className="dropdown">
                  
                <div className="d-flex">
  {/* Nút Đăng Nhập */}
  <button
    className="btn btn-outline-primary me-2"
    type="button"
    onClick={handleLogin}
  >
    Đăng nhập
  </button>

  {/* Nút Đăng Ký */}
  <button
    className="btn btn-outline-success"
    type="button"
    onClick={handleRegister}
  >
    Đăng ký
  </button>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menu list under the header */}
     
    </>
  );
};

export default Header;
