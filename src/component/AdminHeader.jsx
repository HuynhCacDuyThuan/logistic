import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AdminHeader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Đảm bảo Bootstrap JS được import
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Xử lý đăng xuất
  const handleLogout = () => {
      dispatch(logoutUser()); // Đăng xuất và cập nhật Redux state
    navigate("/dang-nhap");
  };

  return (
    <header className="bg-dark text-white p-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <div className="d-flex align-items-center">
          <Link to="/admin" className="admin-link">
            <h4 className="mb-0">Quản Lý Admin</h4>
          </Link>
        </div>

        {/* Nút Đăng xuất */}
        <button className="btn btn-danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
