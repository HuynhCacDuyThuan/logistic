import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import AdminHeader from '../component/AdminHeader';
import Footer from '../component/Footer';
import axios from 'axios';

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


  
      const response = await axios.get(`http://14.225.29.33:81/api/import-orders`, {
        params: { 
          page: currentPage - 1, 
          size: itemsPerPage, 
          search: searchQuery.trim(), 
          createdDate: formattedDate // ✅ Gửi ngày đúng định dạng
        }
      });
  
      console.log(`Fetching: http://14.225.29.33:81/api/import-orders?page=${currentPage - 1}&size=${itemsPerPage}&search=${searchQuery}&createdDate=${formattedDate}`);
  
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
    if (!window.confirm(`Bạn có chắc muốn xóa đơn hàng ID: ${id}?`)) return;
    
    try {
      await axios.delete(`http://14.225.29.33:81/api/import-orders/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
      alert("Xóa đơn hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      alert("Không thể xóa đơn hàng. Vui lòng thử lại!");
    }
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
        <AdminHeader/>
        <div className="container-fluid row mt-2">
          <div className="card p-3 w-100 shadow-sm border">
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

              {/* <div className="input-group mt-3" style={{ maxWidth: '200px' }}>
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
              </div> */}
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
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th rowSpan="2">Ngày</th>
                    <th rowSpan="2">Line</th>
                    <th colSpan="4" className="text-center">Mã Vận Đơn</th>
                    <th rowSpan="2">Tên sản phẩm</th>
                    <th rowSpan="2">Số Kiện</th>
                    <th rowSpan="2">Đơn vị</th>
                    <th rowSpan="2">Giá trị</th>
                    <th rowSpan="2">Giá Bảo Hiểm</th>
                    <th rowSpan="2">Phương Thức Lấy Hàng</th>
                    <th rowSpan="2">Mã Khách Hàng</th>
                    <th rowSpan="2">Trạng Thái</th>
                    <th rowSpan="2"></th>
                  </tr>
                  <tr>
                    <th className="text-center">TQ</th>
                    <th className="text-center">Mã TQ</th>
                    <th className="text-center">VN</th>
                    <th className="text-center">Mã VN</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{new Date(order.createdDate).toLocaleString()}</td>
                      <td>{order.lineId}</td>
                      <td className="text-danger fw-bold text-center">{order.tqCode}</td>
                      <td className="text-danger text-center">{order.cnShippingCode}</td>
                      <td className="text-success text-center">{order.vnCode}</td>
                      <td className="text-success text-center">{order.vnShippingCode}</td>
                      <td>{order.name}</td>
                      <td>{order.packageNumbers}</td>
                      <td>{order.packageUnitId}</td>
                      <td>{order.packageUnitValue}</td>
                      <td>{order.insurancePrice.toLocaleString()} VNĐ</td>
                      <td>{order.shippingMethod}</td>
                      <td>{order.customerCode}</td>
                      <td>{order.statusId}</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <button 
                            className="btn btn-warning"
                            onClick={() => navigate(`/edit-order/${order.id}`)}
                          >
                            <FiEdit size={20} />
                          </button>
                          <button className="btn btn-danger" onClick={() => handleDeleteOrder(order.id)}>
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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

     <Footer/>
    </div>
  );
}

export default OrderAdmin;
