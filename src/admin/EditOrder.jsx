import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../component/AdminHeader";
import CustomerSelectEdit from "./CustomerSelectEdit";
import { API_URL_All } from "../api";


const API_URL = `${API_URL_All}/api/import-orders`; // API URL chuẩn

const EditOrder = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Điều hướng sau khi cập nhật thành công
  const [order, setOrder] = useState(null); // State lưu dữ liệu đơn hàng
  const [units, setUnits] = useState([]);
  const [lines, setLines] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [customers, setCustomers] = useState([]);
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

    
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_URL_All}/api/users`);
        if (!response.ok) {
          throw new Error("Lỗi khi lấy danh sách khách hàng");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi API:", error);
      }
    };
  
    fetchCustomers();
  }, []);
  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên là bắt buộc"),
   
    lineId: Yup.string().required("Line là bắt buộc"),
    locked: Yup.boolean(), // Thêm validation cho checkbox locked
  });

  const handleSubmit = async (values) => {
    console.log("Dữ liệu gửi đi:", values); // Kiểm tra dữ liệu trước khi gửi
    try {
      const response = await axios.put(`${API_URL}/admin/${id}`, values, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Cập nhật thành công:", response.data);
      toast.success("Cập nhật thành công đơn hàng!", { position: "top-right" });
     
    } catch (error) {
      toast.error( error.response.data);
     
     
    }
  };

  if (!order) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div>
      <AdminHeader />
      <div className="container my-5">
        <h2 className="text-center">Chỉnh sửa đơn hàng</h2>
        <Formik
       initialValues={{
        name: order.name || "",
        userId: order.user?.id || "",
        packageNumbers: order.packageNumbers || "",
        packageUnitValue: order.packageUnitValue || "",
        insurancePrice: order.insurancePrice || "",
        shippingMethod: order.shippingMethod || "",
        cnShippingCode: order.cnShippingCode || "",
        vnShippingCode: order.vnShippingCode || "",
        lineId: order.lineId?.id || "",
        packageUnitId: order.packageUnitId?.id || "",
        statusId: order.statusId?.id || "",
        locked: order.locked || false,
      }}
      
          enableReinitialize={true} // Cập nhật dữ liệu form khi có đơn hàng từ API
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue ,errors }) => (
            <Form className="row g-3 fw-bold">
              <div className="col-md-6">
                <label className="form-label">Tên sản phẩm <span className="text-danger">*</span></label>
                <Field type="text" className="form-control" name="name" />
                       <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <CustomerSelectEdit 
  customers={customers} 
  selectedUserId={values.userId}  // Truyền giá trị userId hiện tại
  setFieldValue={setFieldValue} 
  error={errors.userId} 
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
                <label className="form-label">Line <span className="text-danger">*</span></label>
                <Field as="select" className="form-control" name="lineId">
                  <option value="">Chọn Line</option>
                  {lines.map((line) => (
                    <option key={line.id} value={line.id}>
                      {line.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="lineId" component="div" className="text-danger" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Đơn vị</label>
                <Field as="select" className="form-control" name="packageUnitId">
                  <option value="">Chọn Đơn vị</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="col-md-6">
                <label className="form-label">Trạng thái</label>
                <Field as="select" className="form-control" name="statusId">
                  <option value="">Chọn Trạng thái</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </Field>
              </div>

              {/* Checkbox "Khóa đơn hàng" hiển thị ngang hàng với "Trạng thái" */}
              <div className="col-md-6">
                <label className="form-check-label">Khóa đơn hàng</label>
                <br />
                <br />

                <Field
                  type="checkbox"
                  className="form-check-input"
                  name="locked"
                  checked={values.locked}
                  onChange={() => setFieldValue("locked", !values.locked)} // Đảo giá trị khi checkbox được chọn
                />
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary px-5 py-2 me-3">
                  Cập Nhật
                </button>
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

export default EditOrder;
