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

  // Giả lập dữ liệu sản phẩm
  const mockProducts = [
    { id: 1, name: "Sản phẩm 1", brand: "Brand A", thumbnail: { url: "https://via.placeholder.com/150" }, minPrice: 100, maxPrice: 200 },
    { id: 2, name: "Sản phẩm 2", brand: "Brand B", thumbnail: { url: "https://via.placeholder.com/150" }, minPrice: 150, maxPrice: 250 },
    { id: 3, name: "Sản phẩm 3", brand: "Brand C", thumbnail: { url: "https://via.placeholder.com/150" }, minPrice: 200, maxPrice: 300 },
    // Thêm sản phẩm giả lập ở đây
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts); // Đặt dữ liệu giả
      setTotalPages(1); // Tổng số trang là 1 vì chỉ có 3 sản phẩm
      setLoading(false);
    }, 500); // Giả lập thời gian tải
  }, []); // Gọi hàm chỉ một lần khi component được render

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
      <section className="hero-section text-center py-5 bg-primary text-white">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to ZTO</h1>
          <p className="lead">Cung cấp giải pháp Logistics - Fulfillment toàn diện.</p>
          
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
