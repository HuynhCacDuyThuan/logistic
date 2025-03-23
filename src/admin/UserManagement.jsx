import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Pagination } from "react-bootstrap";
import { FiEdit, FiPlusSquare } from "react-icons/fi";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { API_URL_All } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [customerCode, setCustomerCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery, itemsPerPage, sortColumn, sortDirection]);

  const fetchUsers = async () => {
    try {
      const sortParam = sortColumn ? `${sortColumn},${sortDirection}` : null;
      const response = await axios.get(`${API_URL_All}/api/users`, {
        params: {
          page: currentPage - 1,
          size: itemsPerPage,
          search: searchQuery.trim(),
          sort: sortParam,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      if (response.status !== 200) {
        throw new Error(`Lỗi API: ${response.status} ${response.statusText}`);
      }

      setUsers(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      if (error.response) {
        console.error("Lỗi từ server:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
      } else {
        console.error("Lỗi khi gửi request:", error.message);
      }
    }
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

  const handleShowModal = (user) => {
    if (!user.id) {
      alert("Lỗi: Không tìm thấy ID người dùng!");
      return;
    }
    setSelectedUser(user);
    setCustomerCode(user.customerCode || "");
    setShowModal(true);
  };


  const handleUpdateCustomerCode = async () => {
    if (!selectedUser) return;
  
    try {
      const response = await axios.put(
        `${API_URL_All}/api/users/${selectedUser.id}/update-code`,
        { customerCode: customerCode },
        { headers: { "Content-Type": "application/json" } }
      );
  
      // Hiển thị thông báo từ API
      toast.success(response.data, {
        position: "top-right",
        autoClose: 3000,
      });
  
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi cập nhật mã khách hàng:", error);
  
      // Kiểm tra nếu có response từ server
      const errorMessage =
        error.response?.data || "Không thể cập nhật. Vui lòng thử lại.";
  
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="container my-5">
      <h4 className="text-primary">Danh sách Người Dùng</h4>

      {/* Khu vực tìm kiếm và chọn số lượng hiển thị */}
      <div className="d-flex justify-content-start mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm theo email hoặc tên..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ maxWidth: "300px" }}
        />
        <Form.Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="ms-3"
          style={{ width: "150px" }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Form.Select>
      </div>

      {/* Bảng với các lớp CSS cải thiện */}
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer", textAlign: "center" }}>
              Id
              {sortColumn === "id" && sortDirection === "asc" && <FaSortUp className="ms-1" />}
              {sortColumn === "id" && sortDirection === "desc" && <FaSortDown className="ms-1" />}
            </th>
            <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
              Email
              {sortColumn === "email" && sortDirection === "asc" && <FaSortUp className="ms-1" />}
              {sortColumn === "email" && sortDirection === "desc" && <FaSortDown className="ms-1" />}
            </th>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
              Tên
              {sortColumn === "name" && sortDirection === "asc" && <FaSortUp className="ms-1" />}
              {sortColumn === "name" && sortDirection === "desc" && <FaSortDown className="ms-1" />}
            </th>
            <th onClick={() => handleSort("customerCode")} style={{ cursor: "pointer" }}>
              Mã Khách Hàng
              {sortColumn === "customerCode" && sortDirection === "asc" && <FaSortUp className="ms-1" />}
              {sortColumn === "customerCode" && sortDirection === "desc" && <FaSortDown className="ms-1" />}
            </th>
            <th style={{ textAlign: "center" }}>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ textAlign: "center" }}>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.customerCode}</td>
              <td style={{ textAlign: "center" }}>
                {user.customerCode ? (
                  <a onClick={() => handleShowModal(user)}>
                    <FiEdit className="text-warning" size={20} />
                  </a>
                ) : (
                  <a onClick={() => handleShowModal(user)}>
                    <FiPlusSquare className="text-success" size={20} />
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="d-flex justify-content-end mt-3">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>

      {/* Modal Thêm/Sửa Mã Khách Hàng */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cập Nhật Mã Khách Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email: {selectedUser?.email}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập mã khách hàng"
              value={customerCode}
              onChange={(e) => setCustomerCode(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="success" onClick={handleUpdateCustomerCode}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;