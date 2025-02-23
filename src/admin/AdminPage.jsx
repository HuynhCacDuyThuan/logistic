import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Lấy id từ URL
import AdminHeader from "../component/AdminHeader";
import UserManagement from "./UserManagement";
import PostsPage from "../component/PostsPage";
import BannerManagement from "./InitialBanners";
import OrderAdmin from "./OrderAdmin";
import ModelManagement from "./ModelManagement";
import OrderDeatailsAdmin from "./OrderDeatailsAdmin";
import { useDispatch, useSelector } from "react-redux";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("users");
  const selectedOrderId = useSelector((state) => state.user.selectedOrderId); // Lấy selectedOrderId từ Redux

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? section : section);
  };

  return (
    <div>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar (Left Side) */}
          <div className="col-md-3 bg-light p-4">
            <h4 className="text-center mb-4">Quản Lý Admin</h4>
            <div className="list-group">
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("users")}>Quản lý người dùng</button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("posts")}>Quản lý bài viết</button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("banners")}>Quản lý Banner</button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("orders")}>Quản lý đơn hàng</button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("models")}>Quản lý model</button>
            </div>
          </div>

          {/* Content Area (Right Side) */}
          <div className="col-md-9 p-4">
            <div className="row">
              {/* Quản lý người dùng Section */}
              {activeSection === "users" && (
                <div className="col-md-12 mb-3">
                  <UserManagement />
                </div>
              )}

              {/* Quản lý bài viết Section */}
              {activeSection === "posts" && (
                <div className="col-md-12 mb-3">
                  <PostsPage />
                </div>
              )}

              {/* Quản lý Banner Section */}
              {activeSection === "banners" && (
                <div className="col-md-12 mb-3">
                  <BannerManagement />
                </div>
              )}

              {/* Quản lý Đơn Hàng Section */}
              {activeSection === "orders" && (
                <div className="col-md-12 mb-3">
                  {selectedOrderId == null ? (
                    <OrderAdmin />  // Hiển thị khi id là null
                  ) : (
                    <OrderDeatailsAdmin />  // Hiển thị khi id có giá trị
                  )}
                </div>
              )}

              {/* Quản lý Model Section */}
              {activeSection === "models" && (
                <div className="col-md-10 mb-3">
                  <ModelManagement />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
