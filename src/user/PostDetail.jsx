import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import "../App.css"

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://14.225.29.33:81/api/posts/${id}`);
        setPost(response.data); // Store the fetched post data
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return 
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <p>Loading...</p>
  </div>;

  return (
    <div>


<div  className="header" >
    <Header/>
    </div>
    <div className="container-fluid p-0">
  <div className="container-fluid row mt-2">
    {/* Left side: Danh Mục */}
  

    {/* Right side: Dịch vụ */}
    <div className="col-md-12 col-12 mb-4"> {/* Added col-12 for responsiveness */}
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
