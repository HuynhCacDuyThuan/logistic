import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setUser } from "../redux/userSlice";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import logo from "../img/logo.JPG";
import "../css/headerUser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { div } from "framer-motion/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleLogin = () => navigate("/dang-nhap");
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('persist:root'); // Lấy persisted state từ localStorage
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser)
      const user = parsedUser.user && parsedUser.user !== "null" ? JSON.parse(parsedUser.user) : null;
      if (user) {
        dispatch(setUser(user)); // Nếu có user, dispatch action setUser vào Redux store
      }
    }
  }, [dispatch]);

  return (
    <header className="header navbar navbar-expand-lg shadow-sm">
      <div className="container-fluid">
        <div className="row w-100 align-items-center bg-zto">
          {/* Cột trái - Logo */}
          <div className="col-4 col-md-1 bg-white d-flex align-items-center justify-content-center logo-section">
            <Link className="navbar-brand" to="/trang-chu">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>

          {/* Cột phải - Menu & Profile */}
          <div className="col-8 col-md-11 text-white d-flex align-items-center justify-content-end px-3">
            {/* Navbar Toggler */}
            <button className="navbar-toggler d-lg-none" type="button" onClick={toggleMenu} >
              <span className="navbar-toggler-icon"></span>
            </button>

            {isLoggedIn ? (
              <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav mx-auto text-center">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/trang-chu">TRANG CHỦ</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/order">ĐƠN HÀNG</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div></div>
            )}

            {/* User Profile */}
            <div className="d-flex align-items-center bg-white rounded p-1">
              {isLoggedIn ? (
                <div className="d-flex align-items-center">
                  {/* Dropdown User */}
                  <Dropdown>
                    {/* <p className="text-black">{user.name}</p> */}
                    <Dropdown.Toggle variant="" id="dropdown-user">
                      <img src={user.picture} alt="User Avatar" className="rounded-circle border" width="30" height="30" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.ItemText className="fw-bold user text-center">{user.name}</Dropdown.ItemText>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout} className="text-danger text-center">
                        <FiLogOut size={18} className="me-2" /> Đăng xuất
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <button className="btn btn-outline-primary me-2" onClick={handleLogin}>
                  <AiOutlineUser size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
