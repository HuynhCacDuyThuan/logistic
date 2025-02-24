import React, { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài axios


const UserManagement = () => {
  const [users, setUsers] = useState([]); // Dữ liệu người dùng từ API
  
  // Lấy danh sách người dùng từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://14.225.29.33:81/api/users");
        setUsers(response.data); // Cập nhật danh sách người dùng
      } catch (error) {
        console.error("There was an error fetching the users:", error);
      }
    };

    fetchUsers();
  }, []); // Chạy 1 lần khi component được render lần đầu

  // Handle editing a user
  const handleEditUser = (id) => {
    // Thêm logic để chỉnh sửa người dùng ở đây
    console.log("Editing user with id:", id);
  };

  return (
    <div>
   
      <div className="container my-5">
        {/* User List */}
        <div className="mb-4">
          <h4 className="text-primary">Danh sách Người Dùng</h4>
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Email</th>
                <th>Tên</th>
             
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit User Form */}
        </div>
    </div>
  );
};

export default UserManagement;
