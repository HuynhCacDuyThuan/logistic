import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../css/zto.css";

// Hình ảnh QR code và biểu tượng
const zaloQrCode = "https://res.cloudinary.com/dfy5bqyi7/image/upload/v1742564518/mn7sx5gpgxggxwmzfuff.jpg";
const wechatQrCode = "https://res.cloudinary.com/dfy5bqyi7/image/upload/v1742564575/e2uevovugl9yjpt8ys11.jpg";
const wechatIcon = "https://res.cloudinary.com/dfy5bqyi7/image/upload/v1742563001/fnsqiyfrgjb8ga3tpxej.png";
const zaloIcon = "https://img.icons8.com/?size=100&id=0m71tmRjlxEe&format=png&color=000000";

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          {/* Cột chứa logo và thông tin văn phòng */}
          <Col md={3}>
            <div className="footer-logo">
              <img 
                src="http://res.cloudinary.com/dfy5bqyi7/image/upload/v1742615199/ny3k6jjstycz6lla5ana.png" 
                alt="ZTO Việt Nam" 
                style={{ width: '130%;' }} 
              />
            </div>
            <div className="office-info">
              <h5>Văn phòng Miền Bắc</h5>
              <p className="title-text">
                Địa chỉ: 41B P. Lý Quốc Sư, Hàng Trống, Hoàn Kiếm, Hà Nội, Việt Nam<br />
                Điện thoại: 1900.1005
              </p>
              <h5>Văn phòng Miền Nam</h5>
              <p className="title-text">
                Địa chỉ: Tôn Đức Thắng, Bến Nghé, Quận 1, Hồ Chí Minh, Việt Nam<br />
                Điện thoại: 1900.1015
              </p>
            </div>
          </Col>

          {/* Cột chứa danh sách dịch vụ */}
          <Col className='vt1' style={{marginTop: '66px' , marginLeft :'50px'  }} md={3}>
            <h5>Dịch vụ</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li className="title-text mb-2">Vận chuyển Trung - Việt</li>
              <li className="title-text mb-2">Vận chuyển Nội địa</li>
              <li className="title-text mb-2">Thanh toán hộ NDT</li>
              <li className="title-text mb-2">Fulfillment</li>
            </ul>

            <div> <h5>Chính sách</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li className="title-text mb-2">Bảo hành</li>
              <li className="title-text mb-2">Hoàn tiền</li>
              <li className="title-text mb-2">Bảo mật thông tin</li>
            </ul></div>
          </Col>

          {/* Cột chứa danh sách chính sách */}
        

          {/* Cột chứa phần mạng xã hội */}
          <Col style={{marginTop: '66px'  }} md={3} className="footer-social">
            <h5>Chức năng</h5>
            <p className="title-text">Theo dõi đơn hàng</p>
            <div className="social-row">
              <h5 className="friend">Kết bạn</h5>
              <div className="social-links">
                <div className="social-item">
                  <Image src={zaloQrCode} alt="Zalo QR Code" className="social-qr" />
                  <Image src={zaloIcon} alt="Zalo Icon" className="social-icon" />
                </div>
                <div className="social-item">
                  <Image src={wechatQrCode} alt="WeChat QR Code" className="social-qr" />
                  <Image src={wechatIcon} alt="WeChat Icon" className="social-icon" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Phần copyright */}
      <div className="footer-copyright">
        <Container fluid>
          <Row>
            <Col>
              <p className="text-center mb-0">
                Copyright ©2025 - ZTO VIETNAM | LOGISTIC TRUNG - VIỆT
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;