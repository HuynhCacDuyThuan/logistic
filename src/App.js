import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./user/Home";
import RegistrationPage from "./user/RegistrationPage";
import LoginPage from "./user/LoginPage";
import PricingTable from "./user/PricingTable";
import ServicesPage from "./user/ServicesPage";
import ForgotPasswordPage from "./user/ForgotPasswordPage";
import AdminPage from "./admin/AdminPage";
import AddPostPage from "./admin/AddPostPage";
import PostDetail from "./user/PostDetail";
import EditPostPage from "./admin/EditPostPage";
import OrderTable from "./user/OrderTable";
import OrderDetail from "./user/OrderDetail";
import OrderAdmin from "./admin/OrderAdmin";
import ModelManagement from "./admin/ModelManagement";
import OrderDeatailsAdmin from "./admin/OrderDeatailsAdmin";
import ModelDetailComponent from "./admin/ModelDetailComponent";
import AddOrder from "./admin/AddOrder";
import EditOrder from "./admin/EditOrder";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/trang-chu" element={<Home />} />
        <Route path="/dang-ki" element={<RegistrationPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/Bang-gia" element={<PricingTable />} />
        <Route path="/dich-vu" element={<ServicesPage />} />
        <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route path="/admin/posts/add" element={
              <PrivateRoute roles={['admin']}>

       <AddPostPage />
              </PrivateRoute>
         } />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/admin/posts/edit/:id" element={<EditPostPage />} />
        <Route path="/order" element={<OrderTable />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/quan-li-don-hang" element={
              <PrivateRoute roles={['admin']}>
                 <OrderAdmin />
              </PrivateRoute>
         } />
        <Route path="/model" element={<ModelManagement />} />
        <Route path="/model-details" element={<ModelDetailComponent />} />
        <Route path="/add-order" element={<AddOrder/>} />
        <Route path="/edit-order/:id" element={<EditOrder />} />

      </Routes>
    </Router>
  );
};

export default App;
