import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AdminHeader from "../component/AdminHeader";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL_All } from "../api";
const API_URL = `${API_URL_All}/api/import-orders`; // API URL chuẩn
const EditOrderUser = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Điều hướng sau khi cập nhật thành công
  const [order, setOrder] = useState(null); // State lưu dữ liệu đơn hàng
  const [units, setUnits] = useState([]);
  const [lines, setLines] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Lấy dữ liệu đơn hàng khi có ID
  useEffect(() => {
    if (id) {
      fetchOrderDetails(id);
    }
  }, [id]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`${API_URL}/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Lấy danh sách Units, Lines, Statuses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchWithCheck = async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            console.error(`Lỗi lấy dữ liệu từ ${url}:`, response.statusText);
            return [];
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
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên là bắt buộc"),
    lineId: Yup.string().required("Line là bắt buộc"),
  });

  const handleSubmit = async (values) => {
    if (order.locked) {
      toast.error("Hiện tại chúng tôi đã nhận được đơn nên sẽ không thể thay đổi thông tin. Mọi thắc mắc vui lòng liên hệ bộ phận CSKH", { position: "top-right" });
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/${id}`, values, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Cập nhật thành công đơn hàng!", { position: "top-right" });


  
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);

      toast.error("Hiện tại chúng tôi đã nhận được đơn nên sẽ không thể thay đổi thông tin. Mọi thắc mắc vui lòng liên hệ bộ phận CSKH", { position: "top-right" });
    }
  };

  if (!order) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <h2 className="text-center flex-grow-1 mb-2">Chỉnh sửa đơn hàng</h2>

        <Formik
  initialValues={{
    name: order.name || "",
    packageNumbers: order.packageNumbers || "",
    packageUnitValue: order.packageUnitValue || "",
    insurancePrice: order.insurancePrice || "",
    shippingMethod: order.shippingMethod || "",
    cnShippingCode: order.cnShippingCode || "",
    lineId: order.lineId ? order.lineId.id : "",  // Chỉ lấy id
    packageUnitId: order.packageUnitId ? order.packageUnitId.id : ""  // Chỉ lấy id
  }}
  enableReinitialize={true}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
          {({ values }) => (
            <Form className="row g-3 fw-bold">
              <div className="col-md-6">
                <label className="form-label">Tên sản phẩm <span className="text-danger">*</span></label>
                <Field type="text" className="form-control" name="name" />
                   <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
           
              <div className="col-md-6">
                <label className="form-label">Giá bảo hiểm</label>
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
                <label className="form-label">Line <span className="text-danger">*</span></label>
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
                <button type="submit" className="btn btn-primary me-3">Cập Nhật</button>
                <button className="btn btn-secondary " onClick={() => navigate("/order")}>Quay lại</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditOrderUser;
