import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AdminHeader from "../component/AdminHeader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CustomerSelect from "./CustomerSelect";
import { API_URL_All } from "../api";
const API_URL =`${API_URL_All}/api/import-orders`; // Adjusted API URL

const AddOrder = () => {
  const [units, setUnits] = useState([]);
  const [lines, setLines] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();


  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_URL_All}/api/users/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "omit", // Nếu API không yêu cầu authentication
        });
  
        if (!response.ok) {
          throw new Error(`Lỗi API: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error.message || error);
      }
    };
  
    fetchCustomers();
  }, []);
  
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
    name: Yup.string().required("Tên sản phẩm là bắt buộc"),
    userId: Yup.string().required("Mã khách hàng là bắt buộc"),
    lineId: Yup.string().required("Line là bắt buộc"),
    locked: Yup.boolean(), // Thêm validation cho checkbox locked
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log("Form values before submit:", values);
      const response = await axios.post(API_URL, values, {
        headers: { "Content-Type": "application/json" }, // Gửi JSON thay vì FormData
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
      <AdminHeader />
      <div className="container my-5">


        <h2 className="text-center ">Thêm đơn hàng</h2>

        <Formik
          initialValues={{
            name: "",
            packageNumbers: "",
            insurancePrice: "",
            userId: "", // Thay vì emailCustomer
            shippingMethod: "",
            cnShippingCode: "",
            vnShippingCode: "",
            lineId: "",
            packageUnitId: "",
            statusId: "",
            locked: false,// Thêm validation cho checkbox locked
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors }) => (
            <Form className="row g-3 fw-bold">
              <div className="col-md-6">
  <label className="form-label">
    Tên sản phẩm <span className="text-danger">*</span>
  </label>
  <Field type="text" className="form-control" name="name" />
  <ErrorMessage name="name" component="div" className="text-danger" />
</div>


<CustomerSelect 
  customers={customers} 
  setFieldValue={setFieldValue} 
  error={errors.userId} // Truyền lỗi nếu có
/>




              <div className="col-md-6">
                <label className="form-label">Số lượng kiện hàng</label>
                <Field type="number" className="form-control" name="packageNumbers" />
              </div>


              <div className="col-md-6">
                <label className="form-label">Khối lượng (Kg-M3)</label>
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
                <label className="form-label">Mã vận đơn Việt Nam</label>
                <Field type="text" className="form-control" name="vnShippingCode" />
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

              <div className="col-md-6">
                <label className="form-label">Trạng thái</label>
                <Field as="select" className="form-control" name="statusId">
                  <option value="">Chọn Trạng thái</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </Field>
              </div>
              <div className="col-md-6">
                <label className="form-check-label">Khóa đơn hàng</label>
                <br />
                <br />

                <Field
                  type="checkbox"
                  className="form-check-input"
                  name="locked" // Field name
                  checked={values.locked} // Bind checkbox to Formik value
                  onChange={() => setFieldValue("locked", !values.locked)} // Toggle value on change
                />


              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary me-3">Thêm đơn hàng</button>

                <button className="btn btn-secondary me-3" onClick={() => navigate("/quan-li-don-hang")}>
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

export default AddOrder;
