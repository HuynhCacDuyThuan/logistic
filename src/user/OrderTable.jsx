import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/Header';
import { Link, useNavigate } from 'react-router-dom';

function OrderTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function
  const orders = [
    { id: 1, date: '2025-02-20', name: 'Order 1', warehouse: 'Warehouse A', importTypeId: 101, notes: 'No notes', flowNotes: 'Order processed' },
    { id: 2, date: '2025-02-21', name: 'Order 2', warehouse: 'Warehouse B', importTypeId: 102, notes: 'Urgent order', flowNotes: 'Order dispatched' },
    // Add more orders as needed
  ];

  const filteredOrders = orders.filter(order => 
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.warehouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.flowNotes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (order) => {
    // Navigate to the OrderDetail page with the order id
    navigate(`/order/${order.id}`);
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
      
      {/* Search Section with Flexbox and Responsiveness */}
      <div className="d-flex justify-content-between mb-4 flex-column flex-md-row">
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
      </div>

      {/* Table Section with Scroll for Small Devices */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Warehouse</th>
              <th>Import Type ID</th>
              <th>Notes</th>
              <th>Flow Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ backgroundColor: '#f9f9f9' }}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.name}</td>
                  <td>{order.warehouse}</td>
                  <td>{order.importTypeId}</td>
                  <td>{order.notes}</td>
                  <td>{order.flowNotes}</td>
                  <td>
                    <button 
                      className="btn btn-info" 
                      onClick={() => handleViewDetails(order)}  // Navigate to order details page
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
      </div>
    </div>
    
        </div>
  );
}

export default OrderTable;
