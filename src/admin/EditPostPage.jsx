import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import AdminHeader from "../component/AdminHeader";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill styles
import { useParams, useNavigate } from "react-router-dom";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const EditPostPage = () => {
  const { id } = useParams(); // Get post ID from the URL
  const navigate = useNavigate(); // To navigate back after successful submission
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://14.225.29.33:81/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề là bắt buộc"),
    content: Yup.string().required("Nội dung bài viết là bắt buộc"),
    mainImage: Yup.mixed().notRequired(), // Main image is optional
    subtitles: Yup.array().of(
      Yup.object({
        subtitle: Yup.string().required("Tiêu đề phụ là bắt buộc"),
        image: Yup.mixed().notRequired(), // Subtitle image is optional
      })
    ),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
  
    // Handle main image (if updated or existing image)
    if (values.mainImage instanceof File) {
      const mainImageBase64 = await convertToBase64(values.mainImage);
      formData.append("mainImage", mainImageBase64);
    } else if (typeof values.mainImage === "string" && values.mainImage.trim() !== "") {
      formData.append("mainImage", values.mainImage); // Existing image URL
    } else {
      formData.append("mainImage", null); // No main image selected
    }
  
    // Add title and content
    formData.append("title", values.title);
    formData.append("content", values.content);
  
    // Handle subtitles (with or without images)
    const subtitleList = values.subtitles.map(async (subtitle) => {
      if (subtitle.image instanceof File) {
        const subtitleImageBase64 = await convertToBase64(subtitle.image);
        return { ...subtitle, image: subtitleImageBase64 };
      } else if (typeof subtitle.image === "string" && subtitle.image.trim() !== "") {
        return { ...subtitle, image: subtitle.image }; // Existing subtitle image URL
      } else {
        // If no subtitle image is selected, keep the current image URL from the database
        return { ...subtitle, image: subtitle.image || null }; // Keep existing image or set null
      }
    });
  
    const subtitles = await Promise.all(subtitleList);
  
    // Add subtitles to the formData
    subtitles.forEach((subtitle, index) => {
      formData.append(`subtitles[${index}].id`, subtitle.id);  // Include id here
      formData.append(`subtitles[${index}].subtitle`, subtitle.subtitle);
      formData.append(`subtitles[${index}].image`, subtitle.image || ""); // Handle subtitle image
    });
  
    try {
      // Send PUT request to update the post
      await axios.put(`http://14.225.29.33:81/api/posts/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      alert("Bài viết đã được cập nhật thành công!");
      navigate("/Admin"); // Navigate back to posts list
    } catch (error) {
      console.error("Có lỗi khi cập nhật bài viết:", error.response?.data || error.message);
    }
  };
  

  return (
    <div>
      <AdminHeader />
      <div className="container my-5">
        <h2>Chỉnh sửa Bài Viết</h2>
        <Formik
  initialValues={{
    title: post.title,
    content: post.content,
    mainImage: post.mainImageUrl || null, // Use existing image URL if available
    subtitles: post.subtitles.map((subtitle) => ({
      id: subtitle.id,   // Include the id here
      subtitle: subtitle.subtitle,
      image: subtitle.imageUrl || null, // Existing subtitle image URL or null
    })),
  }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>

          {({ values, setFieldValue }) => (
            <Form>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Tiêu đề</label>
                <Field
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>

              {/* Content */}
              <div className="mb-3">
                <label className="form-label">Nội dung bài viết</label>
                <ReactQuill
                  theme="snow"
                  value={values.content}
                  onChange={(content) => setFieldValue("content", content)}
                  placeholder={"Nhập nội dung bài viết"}
                />
              </div>

              {/* Main Image */}
              <div className="mb-3">
                <label className="form-label">Ảnh chính</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setFieldValue("mainImage", e.target.files[0])}
                />
                {typeof values.mainImage === "string" && values.mainImage && (
                  <div>
                    <img
                      src={values.mainImage}
                      alt="Ảnh hiện tại"
                      style={{ maxWidth: "100px", marginTop: "10px" }}
                    />
                  </div>
                )}
              </div>

              {/* Subtitles and Images */}
              <FieldArray
                name="subtitles"
                render={(arrayHelpers) => (
                  <div>
                    {values.subtitles.map((subtitle, index) => (
                      <div key={index} className="mb-3 row d-flex flex-wrap">
                        <div className="col-md-4">
                          <ReactQuill
                            theme="snow"
                            value={subtitle.subtitle}
                            onChange={(content) =>
                              setFieldValue(`subtitles[${index}].subtitle`, content)
                            }
                            placeholder={`Tiêu đề phụ ${index + 1}`}
                          />
                        </div>

                        <div className="col-md-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setFieldValue(`subtitles[${index}].image`, e.target.files[0])
                            }
                            className="form-control"
                          />
                          {subtitle.image && typeof subtitle.image === "string" && (
                            <img
                              src={subtitle.image}
                              alt="Ảnh phụ"
                              style={{ maxWidth: "100px", marginTop: "10px" }}
                            />
                          )}
                        </div>
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => arrayHelpers.push({ subtitle: "", image: null })}
                    >
                      Thêm tiêu đề phụ
                    </button>
                  </div>
                )}
              />

              {/* Submit Button */}
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Cập nhật Bài Viết
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPostPage;
