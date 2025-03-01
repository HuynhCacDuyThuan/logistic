import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap"; // ✅ Dùng Bootstrap Modal

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Dữ liệu người dùng từ API
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [selectedUser, setSelectedUser] = useState(null); // ID người dùng được chọn
  const [customerCode, setCustomerCode] = useState(""); // Mã khách hàng mới

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch danh sách người dùng
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:81/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };

  // Khi bấm nút "Thêm Mã"
  const handleShowModal = (user) => {
    console.log("User ID:", user.id); // ✅ Debug: Kiểm tra ID trước khi mở modal
    if (!user.id) {
      alert("Lỗi: Không tìm thấy ID người dùng!");
      return;
    }
    
    setSelectedUser(user);
    setCustomerCode(user.customerCode || ""); // Load mã cũ nếu có
    setShowModal(true);
  };
  // Cập nhật mã khách hàng
const handleUpdateCustomerCode = async () => {
  if (!selectedUser) return;

  try {
    await axios.put(
      `http://localhost:81/api/users/${selectedUser.id}/customer-code`,
      { customerCode: customerCode }, // ✅ Gửi JSON Object thay vì string
      { headers: { "Content-Type": "application/json" } }
    );

  
    setShowModal(false);
    fetchUsers(); // Cập nhật lại danh sách người dùng
  } catch (error) {
    console.error("Lỗi khi cập nhật mã khách hàng:", error);
    alert("Không thể cập nhật. Vui lòng thử lại.");
  }
};


  return (
    <div className="container my-5">
      <h4 className="text-primary">Danh sách Người Dùng</h4>

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
          <th>Id</th>
            <th>Email</th>
            <th>Tên</th>
            <th>Mã Khách Hàng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
               <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.customerCode || "Chưa có mã"}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleShowModal(user)}>
                  Thêm Mã
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Thêm Mã Khách Hàng */}
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
