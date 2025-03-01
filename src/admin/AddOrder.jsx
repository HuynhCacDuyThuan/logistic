import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AdminHeader from "../component/AdminHeader";
import axios from "axios";

const API_URL = "http://localhost:81/api/import-orders"; // Adjusted API URL

const AddOrder = () => {
  const [units, setUnits] = useState([]);
  const [lines, setLines] = useState([]);
  const [statuses, setStatuses] = useState([]);

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
          fetchWithCheck("http://localhost:81/api/model-details/by-model/2"),
          fetchWithCheck("http://localhost:81/api/model-details/by-model/1"),
          fetchWithCheck("http://localhost:81/api/model-details/by-model/3"),
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
    packageUnitValue: Yup.number().required("Giá trị mỗi kiện hàng là bắt buộc"),
    insurancePrice: Yup.number().required("Giá bảo hiểm là bắt buộc"),
    customerCode: Yup.string().nullable(),
    shippingMethod: Yup.string().nullable(),
    cnShippingCode: Yup.string().nullable(),
    vnShippingCode: Yup.string().nullable(),
    lineId: Yup.string().required("Line là bắt buộc"),
    packageUnitId: Yup.string().required("Đơn vị là bắt buộc"),
    statusId: Yup.string().required("Trạng thái là bắt buộc"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key] || "");
      });

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" }, // ✅ Send JSON instead
      });

      console.log("Success:", response.data);
      alert("Thêm đơn nhập hàng thành công!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Lỗi khi thêm đơn nhập hàng.");
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="container my-5">
        <h2 className="text-center">Thêm Đơn Nhập Hàng</h2>
        <Formik
          initialValues={{
            name: "",
            packageNumbers: "",
            packageUnitValue: "",
            insurancePrice: "",
            customerCode: "",
            shippingMethod: "",
            cnShippingCode: "",
            vnShippingCode: "",
            lineId: "",
            packageUnitId: "",
            statusId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tên</label>
                <Field type="text" className="form-control" name="name" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Số lượng kiện hàng</label>
                <Field type="number" className="form-control" name="packageNumbers" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Giá trị mỗi kiện hàng</label>
                <Field type="number" className="form-control" name="packageUnitValue" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Giá bảo hiểm</label>
                <Field type="number" className="form-control" name="insurancePrice" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Mã khách hàng</label>
                <Field type="text" className="form-control" name="customerCode" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phương thức lấy hàng</label>
                <Field type="text" className="form-control" name="shippingMethod" />
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
                <label className="form-label">Line</label>
                <Field as="select" className="form-control" name="lineId">
                  <option value="">Chọn Line</option>
                  {lines.map((line) => (
                    <option key={line.name} value={line.name}>{line.name}</option>
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

              <div className="col-md-6">
                <label className="form-label">Trạng thái</label>
                <Field as="select" className="form-control" name="statusId">
                  <option value="">Chọn Trạng thái</option>
                  {statuses.map((status) => (
                    <option key={status.name} value={status.name}>{status.name}</option>
                  ))}
                </Field>
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary">Thêm Đơn Nhập Hàng</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddOrder;
