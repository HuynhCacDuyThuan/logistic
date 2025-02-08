import React, { useState } from "react";
import Header from "../component/Header"; // Adjust the path as needed
import "../css/ForgotPasswordPage.css"
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email (you can improve this with a more sophisticated check)
    if (!email) {
      setError("Email không được để trống.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Sai định dạng Email.");
      return;
    }

    // Handle the password reset logic here
    setError(""); // Clear error if form is valid
    alert("Mật khẩu đã được gửi đến email của bạn.");
  };

  return (
    <div>
      {/* Header */}
      <div className="header" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header />
      </div>

      {/* Main content */}
      <div className="container my-5">
        <div className="border rounded shadow-lg bg-white p-4">
          <div className="row align-items-stretch">
            {/* Left side: Image */}
            <div className="col-md-6 d-flex p-0">
              <img
                src="https://media.vietq.vn/files/HanHien/2023/05/03/logistic.jpg"
                alt="Forgot Password"
                className="img-fluid w-100 rounded-start"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  maxHeight: "600px", // Ensure the image height is appropriate
                  minHeight: "100%",
                }}
              />
            </div>

            {/* Right side: Form */}
            <div className="col-md-6 d-flex align-items-center">
              <div className="p-4 w-100">
                {/* Title */}
                <h2 className="text-center text-uppercase font-weight-bold mb-4">Quên mật khẩu</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Email input */}
                  <div className="mb-3">
                    <label htmlFor="txtEmail" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="txtEmail"
                      className="form-control"
                      placeholder="Email để lấy lại Mật khẩu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Error messages */}
                  {error && (
                    <div className="text-danger mb-3">
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit button */}
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary w-100 fw-bold">
                      Gửi mật khẩu vào mail
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

export default ForgotPasswordPage;
