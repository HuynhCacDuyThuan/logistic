import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AdminHeader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { Dropdown } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false); // State để toggle menu

  // Xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/dang-nhap");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Logo Admin */}
        <Link to="/admin" className="navbar-brand fw-bold">
          Quản Lý Admin
        </Link>

        {/* Toggle Button cho Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Collapse */}
        <div className={`collapse navbar-collapse admin ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link admin" to="/admin">Quản lý người dùng</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link admin" to="/quan-li-bai-viet">Quản lý bài viết</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link admin" to="/quan-li-banner">Quản lý Banner</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link admin" to="/quan-li-don-hang">Quản lý đơn hàng</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link admin" to="/quan-li-model">Quản lý model</Link>
            </li>
          </ul>

          {/* Nút Đăng Xuất */}
          <Dropdown>
                 <Dropdown.Toggle variant="" id="dropdown-user">
                 <img 
      src={"https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?semt=ais_hybrid" } 
      alt="User Avatar"
      className="rounded-circle border "
      width="30" 
      height="30"
    />
                 </Dropdown.Toggle>
             
                 <Dropdown.Menu align="end">
                 
                   <Dropdown.Item onClick={handleLogout} className="text-danger text-center">
                     <FiLogOut size={18} className="me-2" /> Đăng xuất
                   </Dropdown.Item>
                 </Dropdown.Menu>
               </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
