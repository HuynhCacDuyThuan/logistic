import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaWarehouse, FaCalendarAlt, FaClipboardList, FaBoxOpen } from 'react-icons/fa'; // Thêm icons
import Header from '../component/Header';

function OrderDetail() {
  const { id } = useParams();  // Lấy id từ URL
  const [order, setOrder] = useState(null);

  const orders = [
    { id: 1, date: '2025-02-20', name: 'Order 1', warehouse: 'Warehouse A', importTypeId: 101, notes: 'No notes', flowNotes: 'Order processed' },
    { id: 2, date: '2025-02-21', name: 'Order 2', warehouse: 'Warehouse B', importTypeId: 102, notes: 'Urgent order', flowNotes: 'Order dispatched' },
    // Add more orders as needed
  ];

  useEffect(() => {
    // Find the order by id
    const foundOrder = orders.find(order => order.id === parseInt(id));
    setOrder(foundOrder);
  }, [id]);

  if (!order) {
    return <div className="text-center my-5">Order not found!</div>;
  }

  return (
   
 <div>


<div  className="header" >
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
    <div className="col-md-9 col-12 mb-4"> {/* Added col-12 for responsiveness */}
    <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Chi tiết đơn hàng - {order.name}</h4>
            </div>
            <div className="card-body">
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Order ID</span>
                  <span className="badge bg-secondary">{order.id}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                
                  <span className="fw-bold">Date</span>
                  <span>{order.date}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                
                  <span className="fw-bold">Warehouse</span>
                  <span>{order.warehouse}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
              
                  <span className="fw-bold">Import Type ID</span>
                  <span>{order.importTypeId}</span>
                </div>
                <div className="list-group-item">
                  <FaClipboardList className="text-success me-2" />
                  <span className="fw-bold">Notes</span>
                  <p>{order.notes}</p>
                </div>
                <div className="list-group-item">
                  <FaClipboardList className="text-success me-2" />
                  <span className="fw-bold">Flow Notes</span>
                  <p>{order.flowNotes}</p>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-primary" onClick={() => window.history.back()}>Quay lại</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
   


     
   
  );
}

export default OrderDetail;
