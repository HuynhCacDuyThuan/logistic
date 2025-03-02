import React from "react";
import Header from "../component/Header";

const RegistrationPage = () => {
  return (
    <div> 
    <div  className="header" >
        <Header/>
        </div>
    <div className="container my-5">
      
      <div className="border rounded shadow-lg bg-white p-4">
        <div className="row align-items-stretch">
          {/* Left Side: Image */}
          <div className="col-md-6 d-flex p-0">
            <img
              src="https://media.vietq.vn/files/HanHien/2023/05/03/logistic.jpg"
              alt="Logo"
              className="img-fluid w-100 rounded-start"
              style={{
                objectFit: "cover", 
                height: "100%", 
                maxHeight: "600px", // Giữ chiều cao tối đa
                minHeight: "100%", // Giữ kích thước đồng bộ với form
              }}
            />
          </div>

          {/* Right Side: Form */}
          <div className="col-md-6">
            <div className="p-4 h-100">
              <h2 className="text-center font-weight-bold mb-4">Đăng ký</h2>
              <form>
                {/* Họ */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Họ của bạn <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    placeholder="Họ"
                  />
                </div>

                {/* Tên */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Tên của bạn <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    placeholder="Tên"
                  />
                </div>

                {/* Địa chỉ */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Địa chỉ <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Địa chỉ"
                  />
                </div>

                {/* Số điện thoại */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    placeholder="Số điện thoại"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                {/* Ngày sinh */}
                <div className="mb-3">
                  <label htmlFor="birthday" className="form-label">
                    Ngày sinh <span className="text-danger">*</span>
                  </label>
                  <input type="date" id="birthday" className="form-control" />
                </div>

                {/* Giới tính */}
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Giới tính <span className="text-danger">*</span>
                  </label>
                  <select id="gender" className="form-select">
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                  </select>
                </div>

                {/* Tên đăng nhập */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Tên đăng nhập <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                  />
                </div>

                {/* Mật khẩu */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Mật khẩu đăng nhập"
                  />
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Xác nhận mật khẩu <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegistrationPage;
