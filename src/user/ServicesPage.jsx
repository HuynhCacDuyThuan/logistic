import React, { useEffect, useState } from "react";
import "../css/ServicesPage.css"; // Ensure you have this CSS file
import RegistrationForm from "../component/RegistrationForm";
import Header from "../component/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // 🎭 Animation Library
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
        <section className="product-grid-title py-5 mt-3">
        <div className="container">
          <motion.h2
            className="text-center fw-bold title-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <i className="fas fa-truck-fast text-warning me-2"></i> Dịch vụ <i className="fas fa-shipping-fast text-warning ms-2"></i>
          </motion.h2>
          <div className="underline"></div>
        </div>
      </section>

        <div className="container row mt-2">
          {/* Left side: Danh Mục */}
         

          {/* Right side: Dịch vụ */}
          <div className="col-md-12">
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
