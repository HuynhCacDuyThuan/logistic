import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Services.css"
import "../css/zto.css"
import { Link } from "react-router-dom";
import { API_URL_All } from "../api";
const Services = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts data from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL_All}/api/posts/`);
        setPosts(response.data); // Store the fetched data in the state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        {posts.map((post) => (
          <div className="col-sm-3 mb-4" key={post.id}>
            <div className="card d-flex h-100">
              <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "black" }} >
                <img
                  className="card-img-top"
                  src={post.mainImageUrl}
                  alt={post.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate-multi">{post.title}</h5>
                  <p
                    className="card-text text-truncate-5-lines"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Button to view more services */}
      <div className="text-center my-4">
        <Link to="/Dich-vu" className="btn bg-zto text-white" style={{ textDecoration: "none" }} >
          Xem chi tiết dịch vụ
        </Link>
      </div>
    </div>
  );
};

export default Services;
