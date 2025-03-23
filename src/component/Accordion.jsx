import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // Import icon từ react-icons
import '../css/accordion.css';

const Accordion = () => {
  const [openTab, setOpenTab] = useState(0); // Tab đầu tiên mở mặc định

  const toggleTab = (index) => {
    setOpenTab(openTab === index ? null : index);
  };

  return (
    <div className="accordion-section">
      <Container>
        <Row>
          <Col>
            <h2 className="accordion-title">Câu hỏi thường gặp</h2>

            {/* Tab 1: Open accordion tab */}
            <div className="accordion-item mb-2">
              <div
                className={`accordion-header ${openTab === 0 ? 'active' : ''}`}
                onClick={() => toggleTab(0)}
              >
                <span>Open accordion tab</span>
                <span className="accordion-icon">
                  {openTab === 0 ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div className={`accordion-content ${openTab === 0 ? 'open' : ''}`}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation
                  ullamcorper suscipit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation
                  ullamcorper suscipit.
                </p>
              </div>
            </div>

            {/* Tab 2: Closed accordion tab 1 */}
            <div className="accordion-item mb-2">
              <div
                className={`accordion-header ${openTab === 1 ? 'active' : ''}`}
                onClick={() => toggleTab(1)}
              >
                <span>Closed accordion tab 1</span>
                <span className="accordion-icon">
                  {openTab === 1 ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div className={`accordion-content ${openTab === 1 ? 'open' : ''}`}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation
                  ullamcorper suscipit.
                </p>
              </div>
            </div>

            {/* Tab 3: Closed accordion tab 2 */}
            <div className="accordion-item">
              <div
                className={`accordion-header ${openTab === 2 ? 'active' : ''}`}
                onClick={() => toggleTab(2)}
              >
                <span>Closed accordion tab 2</span>
                <span className="accordion-icon">
                  {openTab === 2 ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div className={`accordion-content ${openTab === 2 ? 'open' : ''}`}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation
                  ullamcorper suscipit.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Accordion;