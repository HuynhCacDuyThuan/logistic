import React from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>

        
<div  className="header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
    <Header/>
    </div>
    <div className="container my-5">
      <div className="border rounded shadow-lg bg-white p-4">
        <div className="row align-items-stretch">
          {/* Bên trái: Hình ảnh */}
          <div className="col-md-6 d-flex p-0">
            <img
              src="https://media.vietq.vn/files/HanHien/2023/05/03/logistic.jpg"
              alt="Login"
              className="img-fluid w-100 rounded-start"
              style={{
                objectFit: "cover",
                height: "100%",
                maxHeight: "600px", // Đảm bảo chiều cao phù hợp
                minHeight: "100%", 
              }}
            />
          </div>

          {/* Bên phải: Form đăng nhập */}
          <div className="col-md-6 d-flex align-items-center">
            <div className="p-4 w-100">
              {/* Logo */}
              <div className="text-center mb-3">
                
              </div>

              <h2 className="text-center text-uppercase font-weight-bold mb-4">
                Đăng nhập
              </h2>

              <form>
                {/* Tên đăng nhập */}
                <div className="mb-3">
                  <label htmlFor="txtUsername" className="form-label">
                    Tên đăng nhập <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="txtUsername"
                    className="form-control"
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </div>

                {/* Mật khẩu */}
                <div className="mb-3">
                  <label htmlFor="txtPassword" className="form-label">
                    Mật khẩu <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="txtPassword"
                    className="form-control"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>

                {/* Ghi nhớ mật khẩu */}
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <input
                      type="checkbox"
                      id="chkSave"
                      className="form-check-input"
                    />
                    <label htmlFor="chkSave" className="ms-2">
                      Lưu mật khẩu
                    </label>
                  </div>
                  <Link to="/Quen-mat-khau" className="text-primary">
  Quên mật khẩu?
</Link>
                </div>

                {/* Button Đăng nhập */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                  >
                    Đăng nhập
                  </button>
                </div>

                {/* Liên kết Đăng ký */}
                <div className="text-center mt-3">
                  <p>
                    Chưa có tài khoản?{" "}
                    <a href="/dang-ky" className="text-primary fw-bold">
                      Đăng ký ngay
                    </a>
                  </p>
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

export default LoginPage;
