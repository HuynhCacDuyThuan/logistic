import React, { useState, useEffect } from "react";
import "../css/app.css"; // Import file CSS
import { useNavigate } from "react-router-dom"; // Hook để chuyển hướng
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "../component/SearchForm";
import Services from "../component/Services";
import Footer from "../component/Footer";
import RegistrationForm from "../component/RegistrationForm";
import Header from "../component/Header";

const Home = () => {
  const [products, setProducts] = useState([]); // State để lưu trữ sản phẩm
  const [loading, setLoading] = useState(false); // State để theo dõi trạng thái tải dữ liệu
  const [isScrolled, setIsScrolled] = useState(false); // State để kiểm tra trạng thái cuộn
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const navigate = useNavigate(); // Hook để chuyển hướng đến trang chi tiết
  const [heroImage, setHeroImage] = useState(""); // State lưu ảnh hero section

  const [heroTitle, setHeroTitle] = useState(""); // State lưu tiêu đề
  const [heroDescription, setHeroDescription] = useState(""); // State lưu mô tả

  // Hàm fetch banner từ API
 // Hàm preload ảnh
const preloadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve; // Ảnh tải xong
    img.onerror = reject; // Báo lỗi nếu không tải được
  });

// Hàm fetch banner từ API và preload ảnh
const fetchBanners = async () => {
  try {
    const response = await fetch("http://14.225.29.33:81/api/banner/all");
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        await preloadImage(data[0].imageUrl); // Preload ảnh từ URL
        setHeroImage(data[0].imageUrl); // Chỉ set URL khi ảnh tải xong
        setHeroTitle(data[0].title);
        setHeroDescription(data[0].description);
      }
    } else {
      console.error("Failed to fetch banners:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching banners:", error);
  }
};

  // Gọi fetchBanners khi component được mount
  useEffect(() => {
    fetchBanners();
  }, []);

  // Lắng nghe sự kiện cuộn để thay đổi trạng thái header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Nếu cuộn quá 100px, thay đổi trạng thái
    };

    window.addEventListener("scroll", handleScroll); // Thêm sự kiện cuộn
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup sự kiện cuộn
    };
  }, []);

  // Chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage); // Cập nhật trang hiện tại
    }
  };

  const handleButtonClick = () => {
    navigate("/search"); // Chuyển hướng đến đường dẫn
  };

  return (
    <div>

<div  className="header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
    <Header/>
    </div>
    <div className={`container-fluid hero-header ${isScrolled ? "scrolled" : ""}`}>
      {/* Hero Section */}
      <section className="hero-section text-center py-5 bg-primary text-white"
       style={{
        backgroundImage: `url(${heroImage})`, // Đặt ảnh nền từ API
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "110vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
        marginTop: "-5px",
      }}
      
      >
        <div className="container">
        <h1 className="display-4 fw-bold">{heroTitle || "Welcome to ZTO"}</h1>
        <p className="lead">
          {heroDescription || "Cung cấp giải pháp Logistics - Fulfillment toàn diện."}
        </p>
          
        </div>
      </section>
      <SearchForm/>
      {/* Product Grid Title */}
      <section className="product-grid-title py-4 bg-light mt-2">
        <div className="container">
          <h2 className="text-center fw-bold">Dịch vụ</h2>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="product-grid py-4">
        <div className="container">
         <Services/>
        </div>
      </section>
      
      <div className="bg-light py-3">  <RegistrationForm/></div>
      
      <Footer/>
    </div>
    </div>
  );
};

export default Home;
