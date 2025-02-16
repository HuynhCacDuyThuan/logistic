import React from 'react';
import { Link } from 'react-router-dom';
import "../css/AdminHeader.css"
const AdminHeader = () => {
  return (
    <header className="bg-dark text-white p-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <div className="d-flex align-items-center">
         
        <Link to="/admin" className="admin-link">
      <h4 className="mb-0">Quản Lý Admin</h4>
    </Link>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex align-items-center">
          {/* User Profile */}
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle me-2"></i>Admin
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link to="/profile" className="dropdown-item">
                  <i className="bi bi-person-fill me-2"></i>Hồ sơ
                </Link>
              </li>
              <li>
                <Link to="/logout" className="dropdown-item">
                  <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
