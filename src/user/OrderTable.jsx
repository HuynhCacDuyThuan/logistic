import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import "../App.css"
import "../css/zto.css"
import Footer from '../component/Footer';
import { FiEdit } from 'react-icons/fi';
import { FaCheckCircle, FaLock, FaPlus, FaSortDown, FaSortUp, FaTimesCircle, FaUnlock } from 'react-icons/fa';
import { API_URL_All } from '../api';


function OrderTable() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng từ Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');
  const [userId , setUserId ] = useState(0); 
  const [email, setEmail] = useState(""); 
  const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      fetchUserByEmail();  // Chỉ gọi khi có email hợp lệ
      console.log("User Email:", user.email);
    } else {
      setEmail(null);
    }
  }, [user, userId, code]);  // Chỉ chạy lại khi `user` thay đổi

  useEffect(() => {
    if (userId > 0) {  // Chỉ gọi API khi `userId` hợp lệ
      fetchOrders();
    }
  }, [userId, currentPage, itemsPerPage, searchQuery, searchDate, sortColumn, sortDirection]);
  const fetchUserByEmail = async () => {
    try {
   
      const res = await axios.get(`${API_URL_All}/api/users/email/${user.email}`);
      
      if (res.data) {
        console.log(" User Data:", res.data);
     setUserId(res.data.id); 
     setCode(res.data.customerCode);
        fetchOrders(res.data.id); // Gọi API lấy đơn hàng với userId
      }
    } catch (error) {
      console.error(" Lỗi khi lấy user:", error);
      setError("Không thể lấy thông tin người dùng.");
    }
  };
  const fetchOrders = async () => {
    try {
      // Kiểm tra userId
      if (!userId) {
        console.warn("⚠ Không có userId, không gọi API.");
        return;
      }
  
      console.log(`📡 Fetching orders for userId: ${userId}`);
  
      // Định dạng ngày nếu có searchDate
      const formattedDate = searchDate ? new Date(searchDate).toISOString().split("T")[0] : null;
  
      // Chuẩn bị params
      let params = {
        page: currentPage - 1,
        size: itemsPerPage,
      };
  
      if (formattedDate) {
        params.createdDate = formattedDate;
      } else if (searchQuery.trim() !== "") {
        params.search = searchQuery.trim();
        params.createdDate = ""; // Khi có searchQuery, đặt ngày thành rỗng
      }
  
      // Gọi API với userId trong URL
      const response = await axios.get(`${API_URL_All}/api/import-orders/user/${userId}`, { params });
  
      console.log(" API Response:", response.data);
  
      // Xử lý dữ liệu trả về
      let processedOrders = response.data.content.map((order) => ({
        ...order,
        tqCode: order.cnShippingCode ? order.cnShippingCode.substring(0, 3) : "",
        vnCode: order.vnShippingCode ? order.vnShippingCode.substring(0, 3) : "",
      }));
  
      // Sắp xếp client-side nếu cần
      if (sortColumn) {
        processedOrders.sort((a, b) => {
          const aValue = getNestedValue(a, sortColumn);
          const bValue = getNestedValue(b, sortColumn);
          if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
          if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
      }
  
      // Cập nhật state
      setOrders(processedOrders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setOrders([]); // Trả về mảng rỗng nếu có lỗi
      setError("Không thể tải dữ liệu.");
    } finally {
      setLoading(false); // Đảm bảo loading luôn được tắt
    }
  };
  
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddOrder = () => {
    if (!user || !user.email) {
      navigate("/dang-nhap")
    } else {
      navigate("/add-order-user")
    }
  };

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
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
  return (
    <div>
      <div className="header" >
        <Header />
      </div>
      <div className="container-fluid p-0">
        <div className="container-fluid row mt-2">
          {/* Left side: Danh Mục */}

          {/* Right side: Dịch vụ */}
          <div className="col-md-12 col-12 mb-5"> {/* Added col-12 for responsiveness */}
            <div className="p-3 ">
              {/* Table Section with Scroll for Small Devices */}
              <div className="table-responsive">
                <div className="card p-3 w-100 shadow-sm border">
                  <h3 className="mb-2 text-white p-3 bg-zto" >Đơn Hàng</h3>
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
     
                              
                               <div className="col text-end">
                              {code !== null && code !== "" && (
  <button className="btn btn-success" onClick={handleAddOrder} title="Add New Order">
    <FaPlus /> Thêm Đơn Hàng
  </button>
)}

                             
                            

                    </div>
                  </div>
                  {!user ? (
                    <p className="text-danger text-center">Vui lòng đăng nhập để xem đơn hàng!</p>
                  ) : orders.length === 0 ? (
                    <div className="empty-orders-container text-center">
                      <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Giỏ hàng trống" className="empty-orders-img" />
                      <p className="text-warning mt-3 fs-5 fw-bold">Bạn chưa có đơn hàng nào!</p>
                    </div>
                  ) : (
                    <>
                      {/* Table Section */}
                      <div className="table-responsive">
                      <table className="table table-bordered table-hover">
               <thead className="table-light">
                                 <tr>
                                
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
                      {/* <td>{order.user?.customerCode}</td> */}
                      <td>
  <span className="status-badge">{order.statusId?.name}</span>
</td>

                                <td>
                                  {!order.locked ? (
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                      <FaUnlock className="text-success mt-1" />
                                      <a className="" onClick={() => navigate(`/edit-order-user/${order.id}`)}>
                                        <FiEdit className="text-warning" size={20} />
                                      </a>
                                    </div>
                                  ) : (
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                      <FaLock className="text-danger mt-1" />
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Pagination */}
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
