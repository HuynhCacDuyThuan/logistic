import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AdminHeader from "../component/AdminHeader";
import axios from "axios";
import Header from "../component/Header";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { API_URL_All } from "../api";
const API_URL = `${API_URL_All}/api/import-orders`; // Adjusted API URL

const AddOrderUser = () => {
  const [units, setUnits] = useState([]);
  const [lines, setLines] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng từ Redux
  const [code, setCode] = useState("");
 
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');
  const [userId , setUserId ] = useState(0); // ✅ State để lưu email của user
  
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      fetchUserByEmail();  // Chỉ gọi khi có email hợp lệ
      console.log("User Email:", user.email);
    } else {
      setEmail(null);
    }
  }, [user, userId, code]);  // Chỉ chạy lại khi `user` thay đổi

 
  const fetchUserByEmail = async () => {
    try {
   
      const res = await axios.get(`${API_URL_All}/api/users/email/${user.email}`);
      
      if (res.data) {
        console.log("✅ User Data:", res.data);
     setUserId(res.data.id); // ✅ Lưu ID vào Redux
     setCode(res.data.customerCode);
     
      }
    } catch (error) {
      console.error("❌ Lỗi khi lấy user:", error);
      setError("Không thể lấy thông tin người dùng.");
    }
  };
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (user) {

      setEmail(user.email);
      console.log("User Email:", user.email);
    } else {
      setEmail(null);
    }
  }, [user]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchWithCheck = async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            console.error(`Error fetching ${url}:`, response.statusText);
            return []; // Return empty array to prevent JSON parse error
          }
          return response.json();
        };

        const [unitData, lineData, statusData] = await Promise.all([
          fetchWithCheck(`${API_URL_All}/api/model-details/by-model/2`),
          fetchWithCheck(`${API_URL_All}/api/model-details/by-model/1`),
          fetchWithCheck(`${API_URL_All}/api/model-details/by-model/3`),
        ]);

        setUnits(unitData);
        setLines(lineData);
        setStatuses(statusData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên là bắt buộc"),
  
    lineId: Yup.string().required("Line là bắt buộc"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (!values.userId) {
      toast.error("UserId không được để trống!");
      return;
    }
  
    try {
      const response = await axios.post(API_URL, values, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Success:", response.data);
      toast.success("Thêm đơn hàng thành công!", { position: "top-right" });
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Lỗi khi thêm đơn hàng!", { position: "top-right" });
    }
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <h2 className="text-center ">Thêm đơn hàng</h2>
        <Formik
  enableReinitialize={true} // ✅ Cập nhật lại form khi state thay đổi
  initialValues={{
    name: "",
    packageNumbers: "",
    packageUnitValue: "",
    insurancePrice: "",
    userId: userId || "", // ✅ Gán userId đúng cách
    shippingMethod: "",
    cnShippingCode: "",
    lineId: "",
    packageUnitId: "",
  }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
          
          {({ values, setFieldValue }) => (
            <Form className="row g-3 fw-bold">
                  <div className="col-md-6">
               <label className="form-label">
                 Tên sản phẩm <span className="text-danger">*</span>
               </label>
               <Field type="text" className="form-control" name="name" />
               <ErrorMessage name="name" component="div" className="text-danger" />
             </div>
             <div className="col-md-6">
                <label className="form-label ">Giá bảo hiểm</label>
                <Field type="number" className="form-control" name="insurancePrice" />
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Số lượng kiện hàng</label>
                <Field type="number" className="form-control" name="packageNumbers" />
              </div>
         
              <div className="col-md-6">
                <label className="form-label">Khối lượng (Kg-M3)</label>
                <Field type="number" className="form-control" name="packageUnitValue" />
              </div>
              
              <div className="col-md-6">
                <label className="form-label mb-3">Mã vận đơn Trung Quốc</label>
                <Field type="text" className="form-control" name="cnShippingCode" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phương thức lấy hàng</label>
                <Field as="textarea" className="form-control" name="shippingMethod" />
              </div>
             
                 <div className="col-md-6">
                <label className="form-label">
                  Line <span className="text-danger">*</span>
                </label>
                <Field as="select" className="form-control" name="lineId">
                  <option value="">Chọn Line</option>
                  {lines.map((line) => (
                    <option key={line.id} value={line.id}>{line.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="lineId" component="div" className="text-danger" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Đơn vị</label>
                <Field as="select" className="form-control" name="packageUnitId">
                  <option value="">Chọn Đơn vị</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                  ))}
                </Field>
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary me-3">Thêm đơn hàng</button>
                <button className="btn btn-secondary me-3" onClick={() => navigate("/order")}>
                  Quay lại
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddOrderUser;
