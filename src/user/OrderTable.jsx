import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../App.css"
function OrderTable() {
 
 

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng từ Redux
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // ✅ State để lưu email của user
  useEffect(() => {
    if (user) {  
        fetchOrders();
        setEmail(user.email);
        console.log("User Email:", user.email);
    } else {
      setEmail(null); 
    }
  }, [currentPage, itemsPerPage, user]); 

  const fetchOrders = async () => {
    if (!user || !user.email) {
      console.warn("⚠️ User chưa đăng nhập hoặc không có email!");
      setLoading(false);
      return;
    }
  
    try {
      console.log(`🔍 Fetching customerCode for email: ${user.email}`);
  
     
      const customerRes = await axios.get(`http://14.225.29.33:81/api/users/customer-code/${user.email}`);
      const customerCode = customerRes.data.customerCode;
  
      if (!customerCode) {
        console.warn("Không tìm thấy mã khách hàng!");
        setOrders([]);
        setLoading(false);
        return;
      }
  
      console.log(`Mã khách hàng: ${customerCode}`);
  
    
      const orderRes = await axios.get(`http://14.225.29.33:81/api/import-orders/customer/${customerCode}`, {
        params: { 
          page: currentPage - 1, 
          size: itemsPerPage, 
        }
      });
  
      console.log(`🛒 Đơn hàng:`, orderRes.data);
  
      const processedOrders = orderRes.data.content.map((order) => ({
        ...order,
        tqCode: order.cnShippingCode ? order.cnShippingCode.substring(0, 3) : "",
        vnCode: order.vnShippingCode ? order.vnShippingCode.substring(0, 3) : "",
      }));
  
      setOrders(processedOrders);
      setTotalPages(orderRes.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải dữ liệu.");
      setLoading(false);
    }
  };
  
  

 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleAddOrder = () => {
    navigate("/add-order")
     };

  return (
    <div>


    <div  className="header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Header/>
        </div>
        <div className="container-fluid p-0">
      <div className="container-fluid row mt-2">
        {/* Left side: Danh Mục */}
        <div className="col-md-3 mb-4">
          <div className="side-fixed">
            <div className="side-fixed-wrap">
              <div className="news-top">
                <span className="txt">DANH MỤC</span>
              </div>
              <div className="news-sidebar">
                <div className="news-sidebar-block">
                  <div className="re-menu">
                    <ul className="list-unstyled">
                      <li><Link to="/" className="menu-item"><span className="txt">Trang chủ</span></Link></li>
                      <li><Link to="/order" className="menu-item"><span className="txt">Đơn hàng</span></Link></li>
                     
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        {/* Right side: Dịch vụ */}
        <div className="col-md-9 col-12 mb-5"> {/* Added col-12 for responsiveness */}
        <div className="card p-3 shadow-sm border">
      
    

      {/* Table Section with Scroll for Small Devices */}
      <div className="table-responsive">
    
      <div className="card p-3 w-100 shadow-sm border">
  <h3 className="mb-4 text-white p-3 bg-dark">Đơn Hàng</h3>

  { !user ? (
    <p className="text-danger text-center">Vui lòng đăng nhập để xem đơn hàng!</p>
  ) : orders.length === 0 ? (
    <div className="empty-orders-container text-center">
    <img 
      src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
      alt="Giỏ hàng trống"
      className="empty-orders-img"
    />
    <p className="text-warning mt-3 fs-5 fw-bold">Bạn chưa có đơn hàng nào!</p>
  </div>
  ) : (
    <>
      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Ngày</th>
              <th>Line</th>
              <th colSpan="4" className="text-center">Mã Vận Đơn</th>
              <th>Tên sản phẩm</th>
              <th>Số Kiện</th>
              <th>Đơn vị</th>
              <th>Giá trị</th>
              <th>Giá Bảo Hiểm</th>
              <th>Phương Thức Lấy Hàng</th>
              <th>Mã Khách Hàng</th>
              <th>Trạng Thái</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th className="text-center"></th>
              <th className="text-center">TQ</th>
              <th className="text-center"></th>
              <th className="text-center">VN</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
    </>
  )}
</div>

      </div>
      </div>
    </div>
      </div>
    </div>
    
        </div>
  );
}

export default OrderTable;
