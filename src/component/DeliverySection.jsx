import React from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap"; // Thêm Carousel
import "../css/deliverySection.css";

const DeliverySection = () => {
  return (
    <section className="delivery-section">
      <Container>
        <Row className="align-items-center">
          {/* Left Side: Text Content */}
          <Col md={6} className="delivery-text">
            <div className="delivery-title">
              <span className="title-icon"></span>
              ZTO VIỆT NAM
            </div>
            <p>
              ZTO Việt Nam đã mở chi nhánh ở các vùng trọng điểm kinh tế và đã thành lập 3 trung tâm trung chuyển chính ở ba miền Bắc - Trung - Nam. Đảm bảo vận chuyển hàng hóa cho khách hàng một cách nhanh chóng hiệu quả, không chỉ trong nước mà còn cả quốc tế. Với quy mô và mạng lưới ngày càng mở rộng. Chúng tôi cần hợp tác và phát triển với nguồn nhân lực chất lượng để mang lại dịch vụ tốt nhất cho khách hàng trong lĩnh vực chuyển phát nhanh trong và ngoài nước.
            </p>
            <Button className="delivery-button">Tìm hiểu thêm</Button>
          </Col>

          {/* Right Side: Illustration */}
          <Col md={6} className="delivery-image-container">
            <img
              src="http://res.cloudinary.com/dfy5bqyi7/image/upload/v1742383753/xl5yhz6kh5jxyrpbxhdr.jpg"
              alt="Delivery Person"
              className="delivery-image"
            />
          </Col>
        </Row>
      </Container>

      <section className="core-benefits-section">
        <Container>
          <div className="text-center">
            <h2 className="core-benefits-title">Lợi ích cốt lõi</h2>
            <p className="core-benefits-subtitle">
              Chúng tôi luôn cố gắng hiểu vấn đề của khách hàng để tìm giải pháp phù hợp
            </p>
          </div>

          {/* Thêm Carousel */}
          <Carousel className="benefits-carousel" indicators={false} controls={false}>
            <Carousel.Item>
              <div className="carousel-slide">
                <div className="benefit-box"></div>
                <div className="benefit-box"></div>
                <div className="benefit-box"></div>
                <div className="benefit-box"></div>
              </div>
            </Carousel.Item>
            {/* Nếu bạn muốn nhiều slide hơn, có thể thêm Carousel.Item khác */}
          </Carousel>
        </Container>
      </section>
    </section>
  );
};

export default DeliverySection;