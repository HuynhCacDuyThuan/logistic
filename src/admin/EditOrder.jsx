import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../component/AdminHeader";

const API_URL = "http://14.225.29.33:81/api/import-orders"; // API URL chuẩn

const EditOrder = () => {
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
          fetchWithCheck("http://14.225.29.33:81/api/model-details/by-model/2"),
          fetchWithCheck("http://14.225.29.33:81/api/model-details/by-model/1"),
          fetchWithCheck("http://14.225.29.33:81/api/model-details/by-model/3"),
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
    packageNumbers: Yup.number().required("Số lượng kiện hàng là bắt buộc"),
    packageUnitValue: Yup.number().required("Giá trị mỗi kiện hàng là bắt buộc"),
    emailCustomer: Yup.string().nullable(),
    shippingMethod: Yup.string().nullable(),
    cnShippingCode: Yup.string().nullable(),
    vnShippingCode: Yup.string().nullable(),
    lineId: Yup.string().required("Line là bắt buộc"),
    packageUnitId: Yup.string().required("Đơn vị là bắt buộc"),
    statusId: Yup.string().required("Trạng thái là bắt buộc"),
    locked: Yup.boolean(), // Thêm validation cho checkbox locked
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, values, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Cập nhật thành công:", response.data);
      toast.success("Cập nhật thành công đơn hàng!", { position: "top-right" });
      navigate("/quan-li-don-hang"); // Điều hướng về danh sách đơn hàng
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Lỗi khi cập nhật đơn nhập hàng.");
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
          initialValues={order}
          enableReinitialize={true} // Cập nhật dữ liệu form khi có đơn hàng từ API
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tên sản phẩm</label>
                <Field type="text" className="form-control" name="name" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email khách hàng</label>
                <Field type="text" className="form-control" name="emailCustomer" readOnly />
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
                <label className="form-label">Giá bảo hiểm</label>
                <Field type="number" className="form-control" name="insurancePrice" />
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
                    <option key={unit.name} value={unit.name}>
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
                    <option key={status.name} value={status.name}>
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
