import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../css/delivery-form.css';

const DeliveryForm = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [content, setContent] = useState('');

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Full Name:', fullName);
    console.log('Phone Number:', phoneNumber);
    console.log('Content:', content);
    setFullName('');
    setPhoneNumber('');
    setContent('');
  };

  return (
<div className="container delivery-form-container my-5">
       <Row className="mt-5 d-flex justify-content-around">
  <Col md={12} className="text-center">
    <h2 className='core-benefits-title'>ĐỐI TÁC</h2>
    <div className="d-flex justify-content-around flex-wrap partner-logos mb-2">
      <img
        src="https://ns.psa.vn/wp-content/uploads/2018/06/logo-nha-may-loc-dau-nghi-son-thanh-hoa-e1529568380801.png"
        alt="Partner 1"
        className="img-fluid partner-logo"
      />
      <img
        src="https://pic.trangvangvietnam.com/39556040/section_project_item_image6.png"
        alt="Partner 2"
        className="img-fluid partner-logo"
      />
     <img src="https://inoxthiena.com/Images/image/Thien-A/Doi-tac/Lilama.jpg"
        alt="Partner 3"
        className="img-fluid partner-logo"
      />
      <img src="https://aitvietnam.com/wp-content/uploads/2020/04/AES.jpg"
        alt="Partner 4"
        className="img-fluid partner-logo"
      />
      <img
        src="http://res.cloudinary.com/dfy5bqyi7/image/upload/v1742621036/v7csdgt0xkiteshodbmm.png"
        alt="Partner 5"
        className="img-fluid partner-logo"
      />
      <img
        src="data:image/jpeg;base64,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"
        alt="Partner 6"
        className="img-fluid partner-logo"
      />
      <img
        src="data:image/jpeg;base64,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"
        alt="Partner 7"
        className="img-fluid partner-logo"
      />
    </div>
  </Col>
</Row>
<Row className="align-items-center g-0 justify-content-center">
  <Col md={6} className="form-section">
    <h3 className="mb-4">Đăng ký nhận báo giá</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFullName" className="mb-3">
        <Form.Label>Họ và tên*</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          value={fullName}
          onChange={handleFullNameChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPhoneNumber" className="mb-3">
        <Form.Label>Số điện thoại*</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formContent" className="mb-3">
        <Form.Label>Nội dung*</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder=""
          value={content}
          onChange={handleContentChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Gửi
      </Button>
    </Form>
  </Col>
  <Col md={6} className="image-section">
    <img
      src="http://res.cloudinary.com/dfy5bqyi7/image/upload/v1742730924/xbyspooufqbayiypgl5t.jpg"
      alt="Delivery Illustration"
      className="img-fluid delivery-image"
    />
  </Col>
</Row>
</div>
  );
};

export default DeliveryForm;