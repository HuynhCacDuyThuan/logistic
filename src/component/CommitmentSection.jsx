import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/commitmentSection.css";

const CommitmentSection = () => {
  return (
    <section className="commitment-section">
      <Container>
        <div className="text-center">
          <h2 className="commitment-title">ZTO CAM KẾT</h2>
          <p className="commitment-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
        </div>
        {/* Hàng 1: 2 khối Cam kết */}
        <Row className="commitment-items">
          <Col md={6} className="commitment-item">
            <div className="item-box1">
              <h3 className="item-title">Cam kết 1</h3>
              <p className="item-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </p>
            </div>
          </Col>
          <Col md={6} className="commitment-item">
            <div className="item-box1">
              <h3 className="item-title">Cam kết 2</h3>
              <p className="item-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </p>
            </div>
          </Col>
        </Row>
        {/* Hàng 2: 2 khối Cam kết */}
        <Row className="commitment-items">
          <Col md={6} className="commitment-item">
            <div className="item-box1">
              <h3 className="item-title">Cam kết 3</h3>
              <p className="item-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </p>
            </div>
          </Col>
          <Col md={6} className="commitment-item">
            <div className="item-box1">
              <h3 className="item-title">Cam kết 4</h3>
              <p className="item-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CommitmentSection;