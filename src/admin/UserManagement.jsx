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
      const response = await axios.get("http://14.225.29.33:81/api/users");
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
  
    setShowModal(true);
  };
  // Cập nhật mã khách hàng



  return (
    <div className="container my-5">
      <h4 className="text-primary">Danh sách Người Dùng</h4>

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
          <th>Id</th>
            <th>Email</th>
            <th>Tên</th>
           
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
               <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

    
    </div>
  );
};

export default UserManagement;
