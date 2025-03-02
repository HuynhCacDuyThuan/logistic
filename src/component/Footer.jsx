import React from 'react';
import logo from "../img/logo.JPG"
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-2 pb-2">
      <div className="container">
        <div className="row">
          {/* Column 1: Company Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}> <a className="navbar-brand fw-bold fs-3" href="#">
                       <img className='Logo'  src={logo}
                        alt="Logo" />
                      </a></h5>
            <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
              Cung cấp giải pháp Logistics - Fulfillment toàn diện.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase mb-3" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white" style={{ textDecoration: 'none', fontSize: '1rem' }}>Trang chủ</Link>
              </li>
              <li>
                <Link to="/order" className="text-white" style={{ textDecoration: 'none', fontSize: '1rem' }}>Đơn hàng</Link>
              </li>
              
            </ul>
          </div>

          {/* Column 3: Address */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase mb-3" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Địa chỉ</h6>
            <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            41b P. Lý Quốc Sư, Hàng Trống, Hoàn Kiếm, Hà Nội, Việt Nam
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            QPJ5+P7W, Tôn Đức Thắng, Bến Nghé, Quận 1, Hồ Chí Minh, Việt Nam
            </p>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
