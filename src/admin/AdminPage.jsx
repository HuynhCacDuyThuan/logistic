import React, { useState } from "react";
import { Link } from "react-router-dom"; // Make sure to use Link for routing instead of <a>
import PostsPage from "../component/PostsPage";
import AdminHeader from "../component/AdminHeader";
import CategoryManagement from "./categories";
import BannerManagement from "./InitialBanners";
import UserManagement from "./UserManagement";

const AdminPage = () => {
  // Set default active section to "users"
  const [activeSection, setActiveSection] = useState("users");

  // Function to handle section toggling
  const toggleSection = (section) => {
    // If the same section is clicked, toggle off, else switch to the new section
    setActiveSection(activeSection === section ? null : section);
  };

  return (
   <div><AdminHeader/>
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar (Left Side) */}
        <div className="col-md-3 bg-light p-4">
          <h4 className="text-center mb-4">Quản Lý Admin</h4>
          <div className="list-group">
            <button
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection("users")}
            >
              Quản lý người dùng
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection("posts")}
            >
              Quản lý bài viết
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection("categories")}
            >
              Quản lý Danh mục
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection("banners")}
            >
              Quản lý Banner
            </button>
          </div>
        </div>

        {/* Content Area (Right Side) */}
        <div className="col-md-9 p-4">
        
          <div className="row">
            {/* Quản lý người dùng Section */}
            {activeSection === "users" && (
              <div className="col-md-12 mb-3">
            <UserManagement/>
              </div>
            )}

            {/* Quản lý bài viết Section */}
            {activeSection === "posts" && (
              <div className="col-md-12 mb-3">
                <PostsPage/>
              </div>
            )}

            {/* Quản lý Danh mục Section */}
            {activeSection === "categories" && (
              <div className="col-md-12 mb-3">
                <CategoryManagement/>
              </div>
            )}

            {/* Quản lý Banner Section */}
            {activeSection === "banners" && (
              <div className="col-md-12 mb-3">
               <BannerManagement/>
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
