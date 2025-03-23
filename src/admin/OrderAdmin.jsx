import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaLock, FaPlus, FaTimesCircle, FaUnlock, FaSortUp, FaSortDown, FaSyncAlt } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Modal, Button, Form } from 'react-bootstrap';
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
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showQuickUpdate, setShowQuickUpdate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [currentPage, itemsPerPage, searchQuery, searchDate, sortColumn, sortDirection]);

  const fetchOrders = async () => {
    try {
      const formattedDate = searchDate ? new Date(searchDate).toISOString().split("T")[0] : null;
      const response = await axios.get(`${API_URL_All}/api/import-orders`, {
        params: {
          page: currentPage - 1,
          size: itemsPerPage,
          search: searchQuery.trim(),
          createdDate: formattedDate
        }
      });

      let processedOrders = response.data.content.map((order) => ({
        ...order,
        tqCode: order.cnShippingCode ? order.cnShippingCode.substring(0, 3) : "",
        vnCode: order.vnShippingCode ? order.vnShippingCode.substring(0, 3) : "",
      }));

      if (sortColumn) {
        processedOrders.sort((a, b) => {
          const aValue = getNestedValue(a, sortColumn);
          const bValue = getNestedValue(b, sortColumn);
          if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
          if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
      }

      setOrders(processedOrders);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải dữ liệu.");
      setLoading(false);
    }
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortColumn(null);
        setSortDirection("asc");
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const handleDeleteOrder = async (id) => {
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
          setOrders(orders.filter((order) => order.id !== id));
          toast.success("Xóa đơn hàng thành công!", { position: "top-right" });
          Swal.fire("Đã xóa!", "Đơn hàng đã được xóa.", "success");
        } catch (error) {
          console.error("Lỗi khi xóa đơn hàng:", error);
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
    navigate("/add-order");
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((orderId) => orderId !== id)
        : [...prevSelected, id]
    );
  };

  const handleQuickUpdate = () => {
    if (selectedOrders.length > 0) {
      setShowQuickUpdate(true);
    } else {
      toast.warning("Vui lòng chọn ít nhất một đơn hàng để cập nhật.", { position: "top-right" });
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus) {
      toast.warning("Vui lòng chọn hành động.", { position: "top-right" });
      return;
    }

    try {
      if (selectedStatus === "0") {
        await Promise.all(
          selectedOrders.map((orderId) =>
            axios.put(`${API_URL_All}/api/import-orders/${orderId}/lock`)
          )
        );
        toast.success("Khóa đơn hàng thành công!", { position: "top-right" });
      } else if (selectedStatus === "1") {
        await Promise.all(
          selectedOrders.map((orderId) =>
            axios.put(`${API_URL_All}/api/import-orders/${orderId}/unlock`)
          )
        );
        toast.success("Mở khóa đơn hàng thành công!", { position: "top-right" });
      }

      setShowQuickUpdate(false);
      setSelectedOrders([]);
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi thực hiện hành động:", error);
      toast.error("Không thể thực hiện hành động.", { position: "top-right" });
    }
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
                    setSearchDate("");
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
                    setSearchQuery("");
                  }}
                />
              </div>
              <div className="input-group" style={{ maxWidth: '150px' }}>
                <select
                  className="form-select"
                  value={itemsPerPage}
                  onChange={handleChangeItemsPerPage}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center mb-2">
              <button className="btn btn-success" onClick={handleAddOrder} title="Add New Order">
                <FaPlus /> Thêm Đơn Hàng
              </button>
              <button className="btn btn-primary" onClick={handleQuickUpdate} title="Quick Update">
                <FaSyncAlt /> Cập Nhật Nhanh
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th rowSpan="2" style={{ textAlign: 'center' }}></th>
                    <th rowSpan="2" onClick={() => handleSort('createdDate')} style={{ cursor: 'pointer' }}>
                      Ngày
                      {sortColumn === 'createdDate' && sortDirection === 'asc' && <FaSortUp className="ms-1" />}
                      {sortColumn === 'createdDate' && sortDirection === 'desc' && <FaSortDown className="ms-1" />}
                    </th>
                    <th rowSpan="2" onClick={() => handleSort('lineId.name')} style={{ cursor: 'pointer' }}>
                      Line
                      {sortColumn === 'lineId.name' && sortDirection === 'asc' && <FaSortUp className="ms-1" />}
                      {sortColumn === 'lineId.name' && sortDirection === 'desc' && <FaSortDown className="ms-1" />}
                    </th>
                    <th colSpan="4" className="text-center">Mã Vận Đơn</th>
                    <th rowSpan="2" onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                      Tên sản phẩm
                      {sortColumn === 'name' && sortDirection === 'asc' && <FaSortUp className="ms-1" />}
                      {sortColumn === 'name' && sortDirection === 'desc' && <FaSortDown className="ms-1" />}
                    </th>
                    <th rowSpan="2" onClick={() => handleSort('packageNumbers')} style={{ cursor: 'pointer' }}>
                      Số Kiện
                      {sortColumn === 'packageNumbers' && sortDirection === 'asc' && <FaSortUp className="ms-1" />}
                      {sortColumn === 'packageNumbers' && sortDirection === 'desc' && <FaSortDown className="ms-1" />}
                    </th>
                    <th rowSpan="2">Đơn vị</th>
                    <th rowSpan="2" onClick={() => handleSort('packageUnitValue')} style={{ cursor: 'pointer' }}>
                      Khối lượng
                      {sortColumn === 'packageUnitValue' && sortDirection === 'asc' && <FaSortUp className="ms-1" />}
                      {sortColumn === 'packageUnitValue' && sortDirection === 'desc' && <FaSortDown className="ms-1" />}
                    </th>
                    <th rowSpan="2" onClick={() => handleSort('insurancePrice')} style={{ cursor: 'pointer' }}>
                      Bảo Hiểm
                      {sortColumn === 'insurancePrice' && sortDirection === 'asc' && <FaSortUp className="ms-1" />}
                      {sortColumn === 'insurancePrice' && sortDirection === 'desc' && <FaSortDown className="ms-1" />}
                    </th>
                    <th rowSpan="2">Phương Thức Lấy Hàng</th>
                    <th rowSpan="2" onClick={() => handleSort('user.customerCode')} style={{ cursor: 'pointer' }}>
                      Mã Khách Hàng
                      {sortColumn === 'user.customerCode' && sortDirection === 'asc' && <FaSortUp className="ms-1" />}
                      {sortColumn === 'user.customerCode' && sortDirection === 'desc' && <FaSortDown className="ms-1" />}
                    </th>
                    <th rowSpan="2" onClick={() => handleSort('statusId.name')} style={{ cursor: 'pointer' }}>
                      Trạng Thái
                      {sortColumn === 'statusId.name' && sortDirection === 'asc' && <FaSortUp className="ms-1" />}
                      {sortColumn === 'statusId.name' && sortDirection === 'desc' && <FaSortDown className="ms-1" />}
                    </th>
                    <th rowSpan="2">Giá cước</th>
                    <th rowSpan="2"> Trạng thái giá cước</th>
                   
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
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                        />
                      </td>
                      <td>
                        {new Date(order.createdDate).toLocaleDateString("vi-VN", { month: "2-digit", day: "2-digit" })}{" "}
                        {new Date(order.createdDate).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
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
                      <td>
                      
                      </td>
                      <td>
                      
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
            <Modal show={showQuickUpdate} onHide={() => setShowQuickUpdate(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Cập Nhật Nhanh</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="statusSelect">
                    <Form.Label>Hình thức cập nhật</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="">Chọn hành động</option>
                      <option value="0">Khóa đơn hàng</option>
                      <option value="1">Mở đơn hàng</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowQuickUpdate(false)}>
                  Đóng
                </Button>
                <Button variant="primary" onClick={handleUpdateStatus}>
                  Cập Nhật
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="d-flex justify-content-end">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>« Previous</button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next »</button>
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