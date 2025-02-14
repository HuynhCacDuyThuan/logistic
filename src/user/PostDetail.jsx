import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(response.data); // Store the fetched post data
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>


<div  className="header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
    <Header/>
    </div>
    <div className="container-fluid p-0">
  <div className="container-fluid row mt-2">
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
                  <li><a href="/Bang-gia" className="menu-item"><span className="txt">Bảng giá</span></a></li>
                  <li><a href="" className="menu-item"><span className="txt">Hướng dẫn</span></a></li>
                  <li className="active"><a href="#" className="menu-item"><span className="txt">Dịch vụ</span></a></li>
                  <li><a href="/" className="menu-item"><span className="txt">Tổng quan</span></a></li>
                  <li><a href="#" className="menu-item"><span className="txt">Chính sách</span></a></li>
                  <li><a href="/" className="menu-item"><span className="txt">Tin tức</span></a></li>
                  <li><a href="/chuyen-muc/nguon-hang-trung-quoc" className="menu-item"><span className="txt">Nguồn hàng Trung Quốc</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right side: Dịch vụ */}
    <div className="col-md-9 col-12 mb-4"> {/* Added col-12 for responsiveness */}
      <div className="service-section">
        <div className="card mb-4 shadow-sm rounded">
          <img
            className="card-img-top"
            src={post.mainImageUrl}
            alt={post.title}
            style={{
              maxHeight: "400px",
              objectFit: "cover",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div className="card-body">
            <h3
              className="card-title"
              style={{ fontSize: "1.8rem", fontWeight: "600", marginBottom: "20px" }}
            >
              {post.title}
            </h3>
            <p
              className="card-text"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: "1rem",
                lineHeight: "1.5",
                marginBottom: "20px",
                color: "#333",
              }}
            ></p>
            {post.subtitles.map((subtitle) => (
              <div key={subtitle.id} className="my-4">
                <h5
                  dangerouslySetInnerHTML={{ __html: subtitle.subtitle }}
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    marginBottom: "10px",
                    color: "#555",
                  }}
                ></h5>
                <img
                  src={subtitle.imageUrl}
                  alt="Subtitle"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
      
      </div>
    </div>
  </div>
</div>

    </div>
   
  );
};

export default PostDetail;
