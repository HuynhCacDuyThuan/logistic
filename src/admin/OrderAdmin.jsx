import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaLock, FaPlus, FaTimesCircle, FaUnlock } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import AdminHeader from '../component/AdminHeader';
import Footer from '../component/Footer';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import { API_URL_All } from '../api';
function OrderAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [currentPage, itemsPerPage, searchQuery, searchDate]);

  const fetchOrders = async () => {
    try {
      const formattedDate = searchDate ? new Date(searchDate).toISOString().split("T")[0] : null;
      const response = await axios.get(`${API_URL_All}/api/import-orders`, {
        params: {
          page: currentPage - 1,
          size: itemsPerPage,
          search: searchQuery.trim(),
          createdDate: formattedDate // ✅ Gửi ngày đúng định dạng
        }
      });

      

      const processedOrders = response.data.content.map((order) => ({
        ...order,
        tqCode: order.cnShippingCode ? order.cnShippingCode.substring(0, 3) : "",
        vnCode: order.vnShippingCode ? order.vnShippingCode.substring(0, 3) : "",
      }));

      setOrders(processedOrders);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải dữ liệu.");
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    // Hiển thị hộp thoại xác nhận
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục đơn hàng này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa ngay!",
      cancelButtonText: "Hủy"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL_All}/api/import-orders/${id}`);
          
          // Cập nhật lại danh sách đơn hàng
          setOrders(orders.filter((order) => order.id !== id));
  
          // Hiển thị thông báo thành công
          toast.success("Xóa đơn hàng thành công!", { position: "top-right" });
  
          // Hiển thị thông báo SweetAlert2 sau khi xóa thành công
          Swal.fire("Đã xóa!", "Đơn hàng đã được xóa.", "success");
        } catch (error) {
          console.error("Lỗi khi xóa đơn hàng:", error);
          
          // Hiển thị cảnh báo nếu có lỗi
          Swal.fire("Lỗi!", "Không thể xóa đơn hàng.", "error");
        }
      }
    });
  };
  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddOrder = () => {
    navigate("/add-order")
  };

  return (
    <div>
      <div className="container-fluid p-0">
        <AdminHeader />
        <div className="container-fluid row mt-2">
          <div className="card p-3 w-100 shadow-sm border">
            <h3 className="mb-2 text-white p-3 bg-dark">Đơn Hàng</h3>
            <div className="mb-2 d-flex flex-column flex-md-row gap-3 align-items-center">
              <div className="input-group" style={{ maxWidth: '300px' }}>
              <input
  type="text"
  className="form-control"
  placeholder="Tìm kiếm..."
  value={searchQuery}
  onChange={(e) => {
    setSearchQuery(e.target.value);
    setSearchDate(""); // Reset ngày khi nhập vào ô tìm kiếm
  }}
/>

                <button className="btn btn-primary" type="button">Search</button>
              </div>
              <div className="input-group" style={{ maxWidth: '300px' }}>
              <input
  type="date"
  className="form-control"
  value={searchDate}
  onChange={(e) => {
    setSearchDate(e.target.value);
    setSearchQuery(""); // Reset search query khi chọn ngày mới
  }}
/>

              </div>
             
              <div className="col text-end">
                <button className="btn btn-success" onClick={handleAddOrder} title="Add New Order">
                  <FaPlus /> Thêm Đơn Hàng
                </button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th rowSpan="2">Ngày</th>
                    <th rowSpan="2">Line</th>
                    <th colSpan="4" className="text-center">Mã Vận Đơn</th>
                    <th rowSpan="2">Tên sản phẩm</th>
                    <th rowSpan="2">Số Kiện</th>
                    <th rowSpan="2">Đơn vị</th>
                    <th rowSpan="2">Khối lượng</th>
                    <th rowSpan="2">Bảo Hiểm</th>
                    <th rowSpan="2">Phương Thức Lấy Hàng</th>
                    <th rowSpan="2">Mã Khách Hàng</th>
                    <th rowSpan="2">Trạng Thái</th>
                    <th rowSpan="2"></th>
                  </tr>
                  <tr>
                    <th colSpan="2" className="text-center">Mã TQ</th>
                    <th colSpan="2" className="text-center">Mã VN</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        {new Date(order.createdDate).toLocaleDateString("vi-VN", { month: "2-digit", day: "2-digit" })}{" "}
                        {new Date(order.createdDate).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false, // Định dạng giờ 24h
                        })}
                      </td>
                      <td>{order.lineId?.name}</td>

                      <td className="text-danger fw-bold">{order.tqCode}</td>
                      <td className="text-danger">{order.cnShippingCode}</td>
                      <td className="text-success">{order.vnCode}</td>
                      <td className="text-success">{order.vnShippingCode}</td>
                      <td>{order.name}</td>
                      <td className="text-end">{order.packageNumbers?.toLocaleString("vi-VN")}</td>
                      <td>{order.packageUnitId?.name}</td>

                      <td className="text-end">{order.packageUnitValue?.toLocaleString("vi-VN")}</td>
                      <td className="text-end">{order.insurancePrice ? order.insurancePrice.toLocaleString("vi-VN") : "0"}</td>
                      <td className="text-start">{order.shippingMethod}</td>
                      <td>{order.user?.customerCode}</td>
                      <td>
  <span className="status-badge">{order.statusId?.name}</span>
</td>

                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          {!order.locked ? (
                            <FaUnlock className="text-success mt-1" />
                          ) : (
                            <FaLock className="text-danger mt-1" />
                          )}
                          <a onClick={() => navigate(`/edit-order/${order.id}`)}>
                            <FiEdit className="text-warning" size={20} />
                          </a>
                          <a onClick={() => handleDeleteOrder(order.id)}>
                            <FiTrash2 className="text-danger" size={20} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo; Previous</button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next &raquo;</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default OrderAdmin;
