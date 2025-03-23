import React, { useEffect } from "react";
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
import PostsPage from "./component/PostsPage";
import BannerManagement from "./admin/InitialBanners";
import Order from "./admin/Order";
import AddOrderUser from "./user/AddOrderUser";
import EditOrderUser from "./user/EditOrderUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userSlice";
import ReconciliationManagement from "./admin/ReconciliationManagement";
const App = () => {

  const user = useSelector((state) => state.user.user)  || {} ;


  const dispatch = useDispatch();

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
    <Router>
      <Routes>
      {user.role === "user" ? (
  <Route
  path="/"
  element={
    <PrivateRoute roles={['user']}>
      <Home  />
    </PrivateRoute>
  }
/>
) : user.role === "admin" ? (
  <Route
          path="/"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminPage />
            </PrivateRoute>
          }
        />
         
) : (
  <Route path="/" element={<LoginPage />} />
  
)}


      <Route
          path="/posts/:id"
          element={
            <PrivateRoute roles={['user']}>
              <PostDetail  />
            </PrivateRoute>
          }
        />
      <Route
          path="/trang-chu"
          element={
            <PrivateRoute roles={['user']}>
              <Home  />
            </PrivateRoute>
          }
        />

        <Route path="/dang-ki" element={<RegistrationPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
    
    
        <Route
          path="/dich-vu"
          element={
            <PrivateRoute roles={['user']}>
              <ServicesPage  />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-order-user"
          element={
            <PrivateRoute roles={['user']}>
              <AddOrderUser  />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/quan-li-doi-soat"
          element={
            <PrivateRoute roles={['admin']}>
              <ReconciliationManagement />
            </PrivateRoute>
          }
        />
        <Route path="/admin/posts/add" element={
              <PrivateRoute roles={['admin']}>

       <AddPostPage />
              </PrivateRoute>
         } />
             
   
        <Route path="/admin/posts/edit/:id" element={<EditPostPage />} />


        <Route
          path="/order"
          element={
            <PrivateRoute roles={['user']}>
              <OrderTable  />
            </PrivateRoute>
          }
        />


<Route
          path="/order/:id"
          element={
            <PrivateRoute roles={['user']}>
              <OrderDetail  />
            </PrivateRoute>
          }
        />
        
    
        <Route path="/quan-li-model" element={
              <PrivateRoute roles={['admin']}>
                 <Order />
              </PrivateRoute>
         } />

<Route path="/quan-li-don-hang" element={
              <PrivateRoute roles={['admin']}>
                 <OrderAdmin />
              </PrivateRoute>
         } />

        <Route path="/model-details" element={<ModelDetailComponent />} />

        <Route path="/add-order" element={
              <PrivateRoute roles={['admin']}>
                 <AddOrder />
              </PrivateRoute>
         } />
        <Route path="/edit-order/:id" element={
              <PrivateRoute roles={['admin']}>
                 <EditOrder />
              </PrivateRoute>
         } />
         <Route path="/quan-li-bai-dang" element={
              <PrivateRoute roles={['admin']}>
                 <PostsPage />
              </PrivateRoute>
         } />
        <Route path="/edit-order-user/:id" element={<EditOrderUser />} />
    
        <Route path="/quan-li-banner" element={<BannerManagement />}/>
        
        <Route path="/quan-li-bai-viet" element={
              <PrivateRoute roles={['admin']}>

       <PostsPage />
              </PrivateRoute>
         } />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
