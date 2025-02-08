import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Column 1: Company Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>ZTO</h5>
            <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
              Cung cấp giải pháp Logistics - Fulfillment toàn diện.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white" style={{ textDecoration: 'none', fontSize: '1rem' }}>Home</a>
              </li>
              <li>
                <a href="/services" className="text-white" style={{ textDecoration: 'none', fontSize: '1rem' }}>Services</a>
              </li>
              <li>
                <a href="/about" className="text-white" style={{ textDecoration: 'none', fontSize: '1rem' }}>About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-white" style={{ textDecoration: 'none', fontSize: '1rem' }}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Address */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Địa chỉ</h5>
            <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
              123 Logistics Street, Ho Chi Minh City, Vietnam
            </p>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
