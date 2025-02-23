import React, { useState } from "react";
import Header from "../component/Header";
import { Link, useNavigate,  } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // State lưu trữ email nhập vào
  const navigate = useNavigate();
  
  const dispatch = useDispatch();  // Hook để dispatch action

  const responseGoogle = async (response) => {
    if (response.error) {
      console.log('Login Failed:', response.error);
      return;
    }

    const { credential } = response;

    try {
      const res = await fetch('http://localhost:81/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }), // Gửi token cho backend
      });

      const data = await res.json();
      console.log('User data:', data); // Xử lý dữ liệu người dùng từ backend

      if (data.success) {
        dispatch(setUser(data.data));  // Lưu thông tin người dùng vào Redux
        navigate("/"); // Chuyển hướng đến trang chủ
      } else {
        alert("Đăng nhập thất bại: " + data.data); // Hiển thị lỗi nếu có
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };
  // Hàm xử lý khi người dùng submit form đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault(); 

    
    if (email === "phamvulong2411@gmail.com") {
     

     
      navigate("/admin");  
    } else {
      alert("Email không hợp lệ.");
    }
  };

  return (
    <div>
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Header />
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
                <h2 className="text-center text-uppercase font-weight-bold mb-4">
                  Đăng nhập
                </h2>

                {/* Form đăng nhập */}
                <form onSubmit={handleSubmit}>
                  {/* Tên đăng nhập (email) */}
                  <div className="mb-3">
                    <label htmlFor="txtUsername" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="txtUsername"
                      className="form-control"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  
                  </div>

                  {/* Button Đăng nhập */}
                  <div className="text-center mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 fw-bold"
                    >
                      Đăng nhập
                    </button>
                  </div>
                  <div className="text-center">
                  <GoogleLogin 
        onSuccess={responseGoogle}
        onError={() => console.log('Login Failed')}
      />
                  </div>
                  {/* Liên kết Đăng ký */}
             
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
