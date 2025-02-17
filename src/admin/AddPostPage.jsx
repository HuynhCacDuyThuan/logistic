import React, { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import AdminHeader from "../component/AdminHeader";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

// Function to convert an image file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const AddPostPage = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề là bắt buộc"),
    content: Yup.string().required("Nội dung bài viết là bắt buộc"),
    mainImage: Yup.mixed().required("Ảnh chính là bắt buộc"), // Make main image required
    subtitles: Yup.array().of(
      Yup.object({
        subtitle: Yup.string().required("Tiêu đề phụ là bắt buộc"),
        image: Yup.mixed().notRequired(), // Make subtitle image optional
      })
    ),
  });
  

  const handleSubmit = async (values) => {
    const formData = new FormData();
  
    // Handle main image (if provided)
    if (values.mainImage && values.mainImage instanceof File) {
      // Convert image to base64 if it's a file
      const mainImageBase64 = await convertToBase64(values.mainImage);
      formData.append("mainImage", mainImageBase64);
    } else if (values.mainImage && typeof values.mainImage === "string" && values.mainImage.trim() !== "") {
      // If it's a non-null string (existing image URL)
      formData.append("mainImage", values.mainImage);
    } else {
      // No image selected or provided
      formData.append("mainImage", "");  // Or leave this out, depending on backend requirements
    }
  
    // Add title and content
    formData.append("title", values.title);
    formData.append("content", values.content);
  
    // Handle subtitles (with or without images)
    const subtitleList = values.subtitles.map(async (subtitle, index) => {
      if (subtitle.image && subtitle.image instanceof File) {
        // Convert subtitle image to base64 if it's a file
        const subtitleImageBase64 = await convertToBase64(subtitle.image);
        return {
          subtitle: subtitle.subtitle,
          image: subtitleImageBase64,
        };
      } else if (subtitle.image && typeof subtitle.image === "string" && subtitle.image.trim() !== "") {
        // If it's a non-null string (existing subtitle image URL)
        return {
          subtitle: subtitle.subtitle,
          image: subtitle.image,
        };
      } else {
        // No subtitle image selected
        return {
          subtitle: subtitle.subtitle,
          image: "",  // Handle empty image (send empty string or handle as per requirement)
        };
      }
    });
  
    const subtitles = await Promise.all(subtitleList);
  
    // Add subtitles to the formData
    subtitles.forEach((subtitle, index) => {
      formData.append(`subtitles[${index}].subtitle`, subtitle.subtitle);
      formData.append(`subtitles[${index}].image`, subtitle.image);
    });
  
    try {
      // Send the data to the backend
      const response = await axios.post("http://14.225.29.33:8080/api/posts/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Bài viết đã được thêm thành công:", response.data);
    } catch (error) {
      console.error("Có lỗi khi thêm bài viết:", error.response?.data || error.message);
    }
  };
  

  return (
    <div>
      <AdminHeader />
      <div className="container my-5">
        <h2>Thêm Bài Viết</h2>
        <Formik
          initialValues={{
            title: postTitle,
            content: postContent,
            mainImage: null, // No initial main image, can be optional
            subtitles: [{ subtitle: "", image: null }],
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
                {values.mainImage && (
                  <div>
                    <p>Ảnh đã chọn: {values.mainImage.name}</p>
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
                  Thêm Bài Viết
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPostPage;
