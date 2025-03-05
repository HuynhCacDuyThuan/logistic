import React, { useState, useEffect } from "react";
import "../css/app.css"; 
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "../component/SearchForm";
import Services from "../component/Services";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import { motion } from "framer-motion"; // 🎭 Animation Library

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false); 
  const [heroImage, setHeroImage] = useState(""); 
  const [heroDescription, setHeroDescription] = useState(""); 
  const navigate = useNavigate();

  const preloadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve; 
      img.onerror = reject;
    });

  const fetchBanners = async () => {
    try {
      const response = await fetch("http://14.225.29.33:81/api/banner/all");
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          await preloadImage(data[0].imageUrl); 
          setHeroImage(data[0].imageUrl);
          setHeroDescription(data[0].description);
        }
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="header" >
        <Header />
      </div>

      {/* Hero Section */}
      <section
      
       
      >
        <div className="overlay"></div> {/* 🌟 Overlay giúp chữ nổi bật */}
       
      </section>

      {/* Product Grid Title */}
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

      {/* Product Grid */}
      <section id="products" className="product-grid py-4">
        <div className="container">
          <Services />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
