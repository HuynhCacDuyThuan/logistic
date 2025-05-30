import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Lấy id từ URL
import AdminHeader from "../component/AdminHeader";
import UserManagement from "./UserManagement"

import ModelManagement from "./ModelManagement";

import { useDispatch, useSelector } from "react-redux";
import ModelDetailComponent from "./ModelDetailComponent";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("users");
  const selectedOrderId = useSelector((state) => state.user.selectedOrderId); // Lấy selectedOrderId từ Redux
 

  return (
    <div>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar (Left Side) */}
      

          {/* Content Area (Right Side) */}
          <div className="col-md-12 p-4">
            <div className="row">
              {/* Quản lý người dùng Section */}
            
                <div className="col-md-12 mb-3">
                  <UserManagement />
                </div>
           

             

             
            
             

           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
