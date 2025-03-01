import React, { useEffect, useState } from "react";
import "../css/ServicesPage.css"; // Ensure you have this CSS file
import RegistrationForm from "../component/RegistrationForm";
import Header from "../component/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://14.225.29.33:81/api/posts/");
        setServices(response.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <div className="header" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header />
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
                                        <li><Link to="/" className="menu-item"><span className="txt">Trang chủ</span></Link></li>
                                                             <li><Link to="/order" className="menu-item"><span className="txt">Đơn hàng</span></Link></li>
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
                {/* Dynamically render service items */}
                {services.map((service) => (
                  <div className="col-md-4 mb-4" key={service.id}>
                    <div className="service-item d-flex flex-column">
                      <img
                        src={service.mainImageUrl}
                        alt={service.title}
                        className="img-fluid"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                      <h3>{service.title}</h3>
                      <p className="tittle">
                        {service.content.replace(/(<([^>]+)>)/gi, "").slice(0, 100)}...
                      </p>
                      <div className="prose-note-item">
                        <img
                          src="/App_Themes/soituyet/assets/images/prose-icon.svg"
                          alt=""
                          className="prose-icon"
                        />
                      </div>
                      <Link to={`/posts/${service.id}`} className="btn btn-primary mt-auto">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <nav>
              
              </nav>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default ServicesPage;
