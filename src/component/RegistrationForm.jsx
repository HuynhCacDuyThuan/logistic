import React from 'react';

const RegistrationForm = () => {
  return (
    <div className="col-md-6 offset-md-3 my-5 p-4 border  shadow-sm bg-light">
      <div className="text-center mb-4">
        <h2 className="font-weight-bold">Đăng ký tư vấn</h2>
      </div>
      <div>
        <form>
          <div className="row">
            {/* Full Name */}
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="font-weight-bold">Họ tên <span className="text-danger">*</span></label>
              <input className="form-control" type="text" id="name" placeholder="Họ tên" />
            </div>

            {/* Gender */}
            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="font-weight-bold">Bạn là <span className="text-danger">*</span></label>
              <select className="form-control" id="gender">
                <option value="">Tùy chọn</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            {/* Phone Number */}
            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="font-weight-bold">Số điện thoại <span className="text-danger">*</span></label>
              <input className="form-control" type="text" id="phone" placeholder="Nhập số điện thoại của bạn" />
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="font-weight-bold">Email <span className="text-danger">*</span></label>
              <input className="form-control" type="email" id="email" placeholder="Nhập email của bạn" />
            </div>

            {/* Message */}
            <div className="col-12 mb-3">
              <label htmlFor="message" className="font-weight-bold">Lời nhắn <span className="text-danger">*</span></label>
              <textarea className="form-control" id="message" rows="5" placeholder="Nhập lời nhắn của bạn"></textarea>
            </div>
          </div>
          <button className="btn btn-primary d-flex align-items-center justify-content-center mt-3" type="submit">
            <span>Đăng Ký Ngay</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
