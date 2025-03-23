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
import "../css/zto.css"
import { motion } from "framer-motion"; // 🎭 Animation Library
import { API_URL_All } from "../api";
import Banner from "../component/SectionBanner";

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
      const response = await fetch(`${API_URL_All}/api/banner/all`);
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
    <div className="page-container">
  <Header />
<Banner></Banner>
  <div className="content"> {/* Bọc nội dung vào đây */}
    {/* Hero Section */}
    <section>
      <div className="overlay"></div>
    </section>

    
    
  </div> {/* Đóng content */}

  <Footer /> {/* Footer luôn nằm ở dưới */}
</div>

  );
};

export default Home;
