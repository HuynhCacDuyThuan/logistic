import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://14.225.29.33:8080/api/posts/");
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        await axios.delete(`http://14.225.29.33:8080/api/posts/${id}`);
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
        alert("Xóa bài viết thành công!");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Có lỗi xảy ra khi xóa bài viết.");
      }
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="container-fluid">
      <h2 className="text-center mb-4">Danh sách bài viết</h2>
      <div className="row">
        {/* Loop through posts and display each one as a card */}
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={post.mainImageUrl}
                alt={post.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: post.content.slice(0, 100) + "...",
                  }}
                ></p>
                <Link
                  to={`/admin/posts/edit/${post.id}`}
                  className="btn btn-warning me-2"
                >
                  Sửa
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to add new post */}
      <div className="text-center mt-4">
        <Link to="/admin/posts/add" className="btn btn-success">
          Thêm bài viết
        </Link>
      </div>
    </div>
  );
};

export default PostsPage;
