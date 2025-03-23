import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/shippingSection.css";

const ShippingSection = () => {
  return (
    <section className="shipping-section">
      <div className="shipping-background">
        <div className="shipping-overlay"></div>
        <Container className="shipping-content">
          <h2 className="shipping-title">GIẢI PHÁP BỬU CHÍNH TOÀN DIỆN</h2>
          <Row className="shipping-items">
            {/* Dịch vụ số 1 */}
            <Col md={6} className="shipping-item">
              <div className="item-box">
                <div className="item-icon triangle"></div>
                <h3 className="item-title">Dịch vụ số 1</h3>
                
                <p className="item-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>
            </Col>

            {/* Dịch vụ số 2 */}
            <Col md={6} className="shipping-item">
              <div className="item-box">
                <div className="item-icon star"></div>
                <h3 className="item-title">Dịch vụ số 2</h3>
                <p className="item-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>
            </Col>

            {/* Dịch vụ số 3 */}
            <Col md={6} className="shipping-item">
              <div className="item-box">
                <div className="item-icon circle"></div>
                <h3 className="item-title">Dịch vụ số 3</h3>
                <p className="item-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>
            </Col>

            {/* Dịch vụ số 4 */}
            <Col md={6} className="shipping-item">
              <div className="item-box">
                <div className="item-icon square"></div>
                <h3 className="item-title">Dịch vụ số 4</h3>
                <p className="item-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        
      </div>
    </section>
  );
};

export default ShippingSection;