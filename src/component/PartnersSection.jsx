import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "../css/partnersSection.css";

const PartnersSection = () => {
  return (
    <section className="partners-section">
      <Container>
        {/* Partners Header and Logos */}
        <div className="text-center">
          <h2 className="partners-title">Đối tác</h2>
          <div className="partners-logos">
            <img src="https://lilama.com.vn/sites/default/files/default_images/logodefault.jpg" alt="Partner 1" className="partner-logo" />
           
          </div>
        </div>

        {/* Main Content: Form and Illustration */}
        <div className="card-container">
  <Row className="align-items-center">
    {/* Left Side: Form */}
    <Col md={6} className="form-container">
      <div className="form-box">
        <h3 className="form-title">Đăng ký nhận báo giá</h3>
        <Form>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Họ và tên*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập họ và tên"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>Số điện thoại*</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Nhập số điện thoại"
              required
            />
          </Form.Group>

          <Form.Group controlId="formContent" className="mb-3">
            <Form.Label>Nội dung?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập nội dung"
            />
          </Form.Group>

          <Button type="submit" className="form-button">
            Gửi
          </Button>
        </Form>
      </div>
    </Col>

    {/* Right Side: Illustration */}
    <Col md={6} className="illustration-container">
      <img
        src="http://res.cloudinary.com/dfy5bqyi7/image/upload/v1742385030/hvoljtrjcnh3yinhvmca.jpg"
        alt="Delivery Illustration"
        className="illustration-image"
      />
    </Col>
  </Row>
</div>
      </Container>
    </section>
  );
};

export default PartnersSection;