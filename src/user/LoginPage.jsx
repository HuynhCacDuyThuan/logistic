import React, { useState } from "react";
import Header from "../component/Header";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { API_URL, API_URL_All } from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // State lưu trữ email nhập vào
  const [password, setPassword] = useState(""); // State lưu trữ mật khẩu, giá trị mặc định là "zto123"
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State lưu trữ thông báo lỗi
  const dispatch = useDispatch();  // Hook để dispatch action

  const responseGoogle = async (response) => {
    if (response.error) {
      console.error("Google Login Failed:", response.error);
      alert("Đăng nhập Google thất bại. Vui lòng thử lại!");
      return;
    }
  
    const { credential } = response;
  
    if (!credential) {
      console.error("Không nhận được token từ Google:", response);
      alert("Token Google không hợp lệ!");
      return;
    }
  
    try {
      console.log("Sending token to backend:", credential); 
      const res = await fetch(`${API_URL_All}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });
  
      const data = await res.json();
      console.log("Server Response:", data); 
  
      if (data.success) {
        // Đảm bảo dữ liệu trả về chứa thông tin người dùng và role
        const userData = { 
          ...data.data, // Lấy toàn bộ thông tin người dùng từ data.data
          role: "user" // Gán quyền "user" cho tài khoản này
        };
      
        dispatch(setUser(userData)); // Lưu thông tin người dùng vào Redux
        navigate("/trang-chu"); // Chuyển đến trang chính cho người dùng
      } else {
        alert("Đăng nhập thất bại: " + (data.data || "Lỗi không xác định từ server"));
      }
      
    } catch (error) {
      console.error("Error sending request to backend:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };
  // Hàm xử lý khi người dùng submit form đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra email và mật khẩu cho hai tài khoản
    if (
      (email === "ztovietnam.vn@gmail.com" && password === "ztovietnam123@") ||
      (email === "phamvulong2411@gmail.com" && password === "phamvulong2411")
    ) {
      const userData = { email, role: "admin" }; // Cả hai tài khoản đều có role "admin"
      setError(""); // Thay thế alert bằng setError
      dispatch(setUser(userData)); // Lưu thông tin người dùng vào Redux
      navigate("/admin"); // Chuyển đến trang admin
    } else {
      setError("Email hoặc mật khẩu không hợp lệ."); // Thông báo lỗi nếu thông tin không đúng
    }
  };
  
  
  return (
    <div>
      <div className="header" >
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

                  {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {error}
                    </div>
                  )}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  <div className="d-flex justify-content-center ">
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
