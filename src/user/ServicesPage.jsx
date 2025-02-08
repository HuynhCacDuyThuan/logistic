import React from "react";
import "../css/ServicesPage.css"; // Ensure you have this CSS file
import RegistrationForm from "../component/RegistrationForm";
import Header from "../component/Header";

const ServicesPage = () => {
  return (
    <div>


<div  className="header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
    <Header/>
    </div>
    <div className="container-fluid p-0">
     
      {/* Hero Section */}
      <div
        className="hero-content text-center text-white"
        style={{
          backgroundColor: "#4F9E9E",
          padding: "80px 0",
          width: "100%",
          height: "20vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0",
        }}
      >
        <h1 className="hero-title display-3">Dịch vụ</h1>
        <div className="breadcrumb">
          <div className="container">
            <ul
              className="breadcrumb-list d-flex justify-content-center"
              style={{ listStyleType: "none", paddingLeft: "0" }}
            >
              <li className="breadcrumb-item aos-init aos-animate" data-aos="fade-right">
                <a className="breadcrumb-link text-white" href="/" style={{ textDecoration: "none" }}>
                  Trang chủ
                </a>
              </li>
              <li className="breadcrumb-item aos-init aos-animate" data-aos="fade-right">
                <a className="breadcrumb-link text-white" href="/chuyen-muc/dich-vu" style={{ textDecoration: "none" }}>
                  Dịch vụ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container row mt-2">
        {/* Left side: Danh Mục */}
        <div className="col-md-3 mb-4">
          <div className="side-fixed">
            <div className="side-fixed-wrap">
              <div className="news-top">
                <span className="txt">DANH MỤC</span>
              </div>
              <div className="news-sidebar">
                <div className="news-sidebar-block">
                  <div className="re-menu">
                    <ul className="list-unstyled">
                      <li>
                    <a href="/Bang-gia" className="menu-item">
                          <span className="txt">Bảng giá</span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="menu-item">
                          <span className="txt">Hướng dẫn</span>
                        </a>
                      </li>
                      <li className="active">
                        <a href="#" className="menu-item">
                          <span className="txt">Dịch vụ</span>
                        </a>
                      </li>
                      <li>
                        <a href="/" className="menu-item">
                          <span className="txt">Tổng quan</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu-item">
                          <span className="txt">Chính sách</span>
                        </a>
                      </li>
                      <li>
                        <a href="/" className="menu-item">
                          <span className="txt">Tin tức</span>
                        </a>
                      </li>
                      <li>
                        <a href="/chuyen-muc/nguon-hang-trung-quoc" className="menu-item">
                          <span className="txt">Nguồn hàng Trung Quốc</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="news-sidebar-block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Dịch vụ */}
        <div className="col-md-9">
          <div className="service-section">
            <div className="row">
              {/* Service Item 1 */}
              <div className="col-md-4 mb-4">
                <div className="service-item d-flex flex-column">
                  <img
                    src="https://soituyet.vn/Uploads/NewsIMG/ad2a5277-f9db-46a8-803b-acba30852968.png"
                    alt="Dịch Vụ Vận Chuyển Trung Việt"
                    className="img-fluid"
                  />
                  <h3>Dịch Vụ Vận Chuyển Trung Việt</h3>
                  <p className="tittle">
                    Bạn đang tìm kiếm dịch vụ vận chuyển hàng hóa từ Trung Quốc về Việt Nam? Hãy cùng chúng tôi khám phá chi tiết về dịch vụ vận chuyển Trung Quốc và những lợi ích mà nó mang lại.
                  </p>
                  <div className="prose-note-item">
                    <img
                      src="/App_Themes/soituyet/assets/images/prose-icon.svg"
                      alt=""
                      className="prose-icon"
                    />
                    <p className="text">
                      <span className="title">Ngày đăng: </span>11/12/2023
                    </p>
                  </div>
                  <a href="/" className="btn btn-primary mt-auto">
                    Xem chi tiết
                  </a>
                </div>
              </div>

              {/* Service Item 2 */}
              <div className="col-md-4 mb-4">
                <div className="service-item d-flex flex-column">
                  <img
                    src="https://soituyet.vn/Uploads/NewsIMG/509fb7ae-7dcd-43d0-a367-82832354e0f5.jpg"
                    alt="Dịch vụ order 1688"
                    className="img-fluid"
                  />
                  <h3>Dịch vụ order 1688</h3>
                  <p className="tittle">
                    Sàn order 1688 là một trong những sàn bán hàng uy tín và chất lượng, được nhiều chủ buôn Việt Nam lựa chọn.
                  </p>
                  <div className="prose-note-item">
                    <img
                      src="/"
                      alt=""
                      className="prose-icon"
                    />
                    <p className="text">
                      <span className="title">Ngày đăng: </span>13/12/2023
                    </p>
                  </div>
                  <a href="/" className="btn btn-primary mt-auto">
                    Xem chi tiết
                  </a>
                </div>
              </div>

              {/* Service Item 3 */}
              <div className="col-md-4 mb-4">
                <div className="service-item d-flex flex-column">
                  <img
                    src="https://soituyet.vn/Uploads/NewsIMG/62d7cba9-4803-4864-87f8-f9134909b1f6.png"
                    alt="Nhập Hàng Trung Quốc Đơn Giản Và Hiệu Quả"
                    className="img-fluid"
                  />
                  <h3>Nhập Hàng Trung Quốc Đơn Giản Và Hiệu Quả</h3>
                  <p className="tittle">
                    Dịch vụ lấy hàng tận xưởng giúp đơn giản hóa quá trình nhập hàng Trung Quốc. Khám phá giải pháp này để tối ưu hóa việc nhập hàng từ Trung Quốc.
                  </p>
                  <div className="prose-note-item">
                    <img
                      src="/"
                      alt=""
                      className="prose-icon"
                    />
                    <p className="text">
                      <span className="title">Ngày đăng: </span>14/12/2023
                    </p>
                  </div>
                  <a href="/chuyen-muc/dich-vu/nhap-hang-trung-quoc-don-gian-va-hieu-qua-voi-dich-vu-lay-hang-tan-xuong" className="btn btn-primary mt-auto">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center mt-4">
                <li className="page-item">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
     <div className="bg-light py-2"> <RegistrationForm/></div>
    </div>
    </div>
   
  );
};

export default ServicesPage;
