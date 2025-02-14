import React, { useState } from "react";
import AdminHeader from "../component/AdminHeader";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "user1@example.com",
      address: "123 Main St",
      phone: "123-456-7890",
    },
    {
      id: 2,
      email: "user2@example.com",
      address: "456 Elm St",
      phone: "234-567-8901",
    },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    email: "",
    address: "",
    phone: "",
  });

  // Handle editing a user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ email: user.email, address: user.address, phone: user.phone });
  };

  // Handle adding/updating a user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
    } else {
      const newUserId = users.length + 1;
      setUsers([...users, { id: newUserId, ...newUser }]);
    }
    setNewUser({ email: "", address: "", phone: "" });
    setEditingUser(null);
  };

  // Handle deleting a user
  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
   <div>
  
  <div className="container my-5">
     
     {/* User List */}
     <div className="mb-2">
       <h4>Danh sách Người Dùng</h4>
       <table className="table table-striped">
         <thead>
           <tr>
             <th>Email</th>
             <th>Địa chỉ</th>
             <th>Số điện thoại</th>
             <th>Hành động</th>
           </tr>
         </thead>
         <tbody>
           {users.map((user) => (
             <tr key={user.id}>
               <td>{user.email}</td>
               <td>{user.address}</td>
               <td>{user.phone}</td>
               <td>
                 <button
                   className="btn btn-warning me-2"
                   onClick={() => handleEditUser(user)}
                 >
                   Sửa
                 </button>
                 <button
                   className="btn btn-danger"
                   onClick={() => handleDeleteUser(user.id)}
                 >
                   Xóa
                 </button>
               </td>
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
