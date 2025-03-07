import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AdminHeader from "../component/AdminHeader";
import axios from "axios";
import Header from "../component/Header";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const API_URL = "http://14.225.29.33:81/api/import-orders"; // Adjusted API URL

const AddOrderUser = () => {
  const [units, setUnits] = useState([]);
  const [lines, setLines] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng từ Redux
 
  const [email, setEmail] = useState(""); 
  useEffect(() => {
    if (user) {  
       
        setEmail(user.email);
        console.log("User Email:", user.email);
    } else {
      setEmail(null); 
    }
  }, [ user]); 
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
          fetchWithCheck("http://14.225.29.33:81/api/model-details/by-model/2"),
          fetchWithCheck("http://14.225.29.33:81/api/model-details/by-model/1"),
          fetchWithCheck("http://14.225.29.33:81/api/model-details/by-model/3"),
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
    packageNumbers: Yup.number().required("Số lượng kiện hàng là bắt buộc"),
    packageUnitValue: Yup.number().required("Giá trị kiện hàng là bắt buộc"),
    shippingMethod: Yup.string().required("phương thức này bắt buộc"),
    cnShippingCode: Yup.string().required("Mã trung quốc bắt buộc"),
    emailCustomer: Yup.string().required("Email  bắt buộc"),
    lineId: Yup.string().required("Line là bắt buộc"),
    packageUnitId: Yup.string().required("Đơn vị là bắt buộc"),
   
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key] || "");
      });
  
      const response = await axios.post(API_URL, formData, {
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
      <Header/>
      <div className="container my-5">
     
          <h2 className="text-center ">Thêm đơn hàng</h2>
        
        <Formik
  initialValues={{
    name: "",
    packageNumbers: "",
    packageUnitValue: "",
    insurancePrice: "",
    emailCustomer: "",  // Điền giá trị email vào form khi email đã có
    shippingMethod: "",
    cnShippingCode: "",
    lineId: "",
    packageUnitId: "",
  }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ values, setFieldValue }) => (
            <Form className="row g-3">
              <div className="col-md-6">
  <label className="form-label">
    Tên sản phẩm <span className="text-danger">*</span>
  </label>
  <Field type="text" className="form-control" name="name" />
</div>


<div className="col-md-6">
                <label className="form-label">Email khách hàng</label>
                <Field
  type="text"
  className="form-control"
  name="emailCustomer"

/>

              </div>

             

              <div className="col-md-6">
                <label className="form-label">Số lượng kiện hàng</label>
                <Field type="number" className="form-control" name="packageNumbers" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Giá trị kiện hàng (Kg-M3)</label>
                <Field type="number" className="form-control" name="packageUnitValue" />
              </div>
              <div className="col-md-6">
                <label className="form-label mb-3">Giá bảo hiểm</label>
                <Field type="number" className="form-control" name="insurancePrice" />
              </div>
             

              <div className="col-md-6">
  <label className="form-label">Phương thức lấy hàng</label>
  <Field as="textarea" className="form-control" name="shippingMethod" />
</div>


              <div className="col-md-6">
                <label className="form-label">Mã vận đơn Trung Quốc</label>
                <Field type="text" className="form-control" name="cnShippingCode" />
              </div>


              <div className="col-md-6">
  <label className="form-label">
    Line <span style={{ color: "red" }}>*</span>
  </label>
  <Field as="select" className="form-control" name="lineId">
    <option value="">Chọn Line</option>
    {lines.map((line) => (
      <option key={line.name} value={line.name}>
        {line.name}
      </option>
    ))}
  </Field>
</div>


              <div className="col-md-6">
                <label className="form-label">Đơn vị</label>
                <Field as="select" className="form-control" name="packageUnitId">
                  <option value="">Chọn Đơn vị</option>
                  {units.map((unit) => (
                    <option key={unit.name} value={unit.name}>{unit.name}</option>
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
