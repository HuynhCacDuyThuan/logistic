import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaPhone } from "react-icons/fa";
 // Replace with your actual image path
import "../css/banner.css";
import DeliverySection from "./DeliverySection";

import ShippingSection from "./ShippingSection";
import CommitmentSection from "./CommitmentSection";
import DeliveryForm from "./DeliveryForm";
import Accordion from "./Accordion";

const Banner = () => {
  return (
    <section className="banner">
      {/* Background Image and Overlay */}
      <div className="banner-background d-flex align-items-center justify-content-center">
        <div className="banner-overlay"></div>

        {/* Main Content */}
        <Container className="banner-content">
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="banner-title">VẬN CHUYỂN TRUNG - VIỆT</h1>
              <p className="banner-subtitle">
                Thủ tục đơn giản | Vận chuyển nhanh chóng | Hàng hóa an toàn
              </p>
              <div className="banner-actions">
              
              <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <FaPhone
          style={{
            color: 'white',
            fontSize: '24px',
            transform: 'rotate(180deg)', // Xoay để giống chữ "V"
          }}
        />
       <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{ color: 'white', fontSize: '12px', fontFamily: 'Roboto, sans-serif', marginLeft: '-33px' }}>
            Nhân tư vấn
          </span>
          <span style={{ color: 'white', fontSize: '12px', fontFamily: 'Roboto, sans-serif' }}>
            (+84) 888 2002 86
          </span>
        </div>
      </div>
                <Button className="banner-button">Đăng ký</Button>
              </div>
            </Col>
          </Row>

          {/* Navigation Arrows */}
          <div className="banner-arrows">
            <FaArrowLeft className="arrow left-arrow" />
            <FaArrowRight className="arrow right-arrow" />
          </div>
        </Container>
      </div>
<DeliverySection/>
<ShippingSection/>

<CommitmentSection/>
<DeliveryForm></DeliveryForm>
<Accordion/>
    </section>
  );
};

export default Banner;