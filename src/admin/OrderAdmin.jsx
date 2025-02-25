import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/Header';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';  // Import FaPlus for "Add" icon
import { setSelectedOrderId } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function OrderAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10); // State to track items per page
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [showModal, setShowModal] = useState(false);  // State to control the modal visibility
  const [isEditing, setIsEditing] = useState(false);  // State to check if editing or adding
  const [selectedOrder, setSelectedOrder] = useState(null); // To store the order being edited
  const navigate = useNavigate();  // Initialize the navigate function
  const dispatch = useDispatch(); // Khởi tạo useDispatch

  

  const orders = [
    { id: 3, date: '2023-07-12', warehouse: 'MKT', providers: ['Google', 'Yahoo'], sp: 2, sl: 300, totalPay: 26100000, notes: 'Nhập hàng từ kho Ambino\n123456', submit: 'ADMIN', approve: 'Long Pham 2023-12-18', status: 'Kho VN nhận hàng' },
    { id: 4, date: '2023-07-14', warehouse: 'MKT', providers: ['Google'], sp: 1, sl: 100, totalPay: 100000000, notes: 'Nhập led hắt 3 bóng lẻ, nguồn 33A 400W\n321', submit: 'ADMIN', approve: 'Long Pham 2023-12-18', status: 'Đã đặt cọc' },
    { id: 5, date: '2023-07-14', warehouse: 'HCM', providers: ['Yahoo'], sp: 1, sl: 100, totalPay: 200000000, notes: 'Nhập kẹp cố định Led Silicon\n456', submit: 'ADMIN', approve: '', status: 'Nhà cung cấp giao hàng' },
    { id: 42, date: '2023-09-26', warehouse: 'Nhập khác', providers: ['Google', 'Yahoo', 'Amazon', 'IBM'], sp: 4, sl: 1000, totalPay: 47700000, notes: '------', submit: 'ADMIN', approve: '', status: 'Đã đặt cọc' },
];

const statusOptions = [
  "Kho VN nhận hàng",
  "Đã đặt cọc",
  "Nhà cung cấp giao hàng",
  "Đã giao",
  "Hủy đơn"
];

const [ordersState, setOrdersState] = useState(orders); // Tạo state để lưu orders
 // Filter orders by both searchQuery and searchDate
const filteredOrders = orders.filter(order => 
  (
    (order.name?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
    (order.warehouse?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
    (order.notes?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
    (order.flowNotes?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
  ) &&
  (searchDate ? order.date.includes(searchDate) : true)  // Kiểm tra ngày nếu có
);

const handleStatusChange = (orderId, newStatus) => {
  setOrdersState(prevOrders =>
    prevOrders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    )
  );
};

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleViewDetails = (order) => {
    navigate(`/order/${order.id}`);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);  // Set the order to be edited
    setIsEditing(true); // Indicate editing mode
    setShowModal(true); // Open the modal
  };

  const handleDelete = (orderId) => {
    console.log("Delete Order with ID:", orderId);
  };

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddOrder = () => {
    setIsEditing(false);  // Switch to adding mode
    setSelectedOrder(null);  // Reset the selected order
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSaveOrder = () => {
    if (isEditing) {
      console.log("Updated order", selectedOrder);
    } else {
      console.log("New order added");
    }
    setShowModal(false);  // Close the modal after saving
  };


  const handleIDClick = (order) => {
    dispatch(setSelectedOrderId(order.id)); // Cập nhật selectedOrderId khi nhấn vào ID
  };
  return (
    <div>
     
      <div className="container-fluid p-0">
        <div className="container-fluid row mt-2">
          <div className="card p-3 shadow-sm border">
            <h3 className="mb-4 text-white p-3 bg-dark">Quản lý Đơn Hàng</h3>

            <div className="mb-4 d-flex flex-column flex-md-row gap-3 align-items-center">
              <div className="input-group mt-3" style={{ maxWidth: '300px' }}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="tìm kiếm..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="button">Search</button>
              </div>

              <div className="input-group mt-3" style={{ maxWidth: '300px' }}>
                <input 
                  type="date" 
                  className="form-control" 
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>

              <div className="input-group mt-3" style={{ maxWidth: '200px' }}>
                <label className="me-2 align-self-center">Show</label>
                <select 
                  className="form-select" 
                  value={itemsPerPage}
                  onChange={handleChangeItemsPerPage}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className="text-end mb-2">
              <button 
                className="btn btn-success" 
                onClick={handleAddOrder} 
                title="Add New Order"
              >
                <FaPlus /> Thêm Đơn Hàng
              </button>
            </div>

            <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
      <thead className="thead-light">
        <tr>
          <th onClick={() => handleIDClick(null)} style={{ cursor: 'pointer' }}>ID</th>
          <th>Date</th>
          <th>Warehouse</th>
          <th>Providers</th>
          <th>SP</th>
          <th>SL</th>
          <th>Total Pay</th>
          <th>Notes</th>
          <th>Submit</th>
          <th>Approve</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order.id} style={{ backgroundColor: '#f9f9f9' }}>
              <td 
                style={{ cursor: 'pointer', color: 'blue' }} 
                onClick={() => handleIDClick(order)}
              >
                {order.id}
              </td>
              <td>{order.date}</td>
              <td>{order.warehouse}</td>
              <td>{order.providers.join(', ')}</td> {/* Hiển thị danh sách providers */}
              <td>{order.sp}</td>
              <td>{order.sl}</td>
              <td>{order.totalPay.toLocaleString()} VND</td> {/* Định dạng số tiền */}
              <td style={{ whiteSpace: 'pre-line' }}>{order.notes}</td> {/* Giữ xuống dòng trong notes */}
              <td>{order.submit}</td>
              <td>{order.approve || 'Chưa duyệt'}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="form-select"
                >
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <FaEdit className="text-warning me-3" style={{ cursor: 'pointer' }} onClick={() => handleEdit(order)} title="Sửa" />
                <FaTrashAlt className="text-danger" style={{ cursor: 'pointer' }} onClick={() => handleDelete(order.id)} title="Xóa" />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="12" className="text-center">No orders found</td>
          </tr>
        )}
      </tbody>
    </table>
            </div>

            <div className="d-flex justify-content-end mt-4">
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

      {/* Modal for Adding or Editing Order */}
      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block', backdropFilter: 'blur(1px)' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{isEditing ? 'Edit Order' : 'Add New Order'}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="orderName" className="form-label">Order Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="orderName" 
                      value={isEditing ? selectedOrder.name : ''} 
                      onChange={(e) => setSelectedOrder({ ...selectedOrder, name: e.target.value })}
                      placeholder="Enter order name" 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="warehouse" className="form-label">Warehouse</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="warehouse" 
                      value={isEditing ? selectedOrder.warehouse : ''} 
                      onChange={(e) => setSelectedOrder({ ...selectedOrder, warehouse: e.target.value })}
                      placeholder="Enter warehouse" 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes</label>
                    <textarea 
                      className="form-control" 
                      id="notes" 
                      value={isEditing ? selectedOrder.notes : ''} 
                      onChange={(e) => setSelectedOrder({ ...selectedOrder, notes: e.target.value })}
                      rows="3" 
                      placeholder="Enter any notes"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveOrder}>{isEditing ? 'Update Order' : 'Save Order'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderAdmin;
