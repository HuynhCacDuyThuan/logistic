import React, { useState } from "react";
import AdminHeader from "../component/AdminHeader";
import ModelManagement from "./ModelManagement";
import { useDispatch, useSelector } from "react-redux";
import ModelDetailComponent from "./ModelDetailComponent";

const Order = () => {
  const selectedOrderId = useSelector((state) => state.user.selectedOrderId); // Lấy selectedOrderId từ Redux
  return (
    <div>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar (Left Side) */}
          <div className="col-md-12 mb-3">
            {selectedOrderId == null ? (
              <ModelManagement />
            ) : (
              <ModelDetailComponent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
