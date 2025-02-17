import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [editingBanner, setEditingBanner] = useState(null); // Thêm state để lưu banner đang sửa

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch("http://14.225.29.33:81/api/banner/all");
      if (response.ok) {
        const data = await response.json();
        setBanners(data);
      } else {
        console.error("Failed to fetch banners:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://14.225.29.33:81/api/banner/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBanners(banners.filter((banner) => banner.id !== id)); // Xóa banner khỏi danh sách
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle edit banner
  const handleEdit = (banner) => {
    setEditingBanner(banner); // Set banner cần sửa
  };

  return (
    <div className="container my-5">
      {/* Banner List */}
      <h4>Danh sách Banner</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tiêu Đề</th>
            <th>Mô Tả</th>
            <th>Hình Ảnh</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id}>
              <td>{banner.title}</td>
              <td>{banner.description}</td>
              <td>
                <img src={banner.imageUrl} alt={banner.title} width="100" />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(banner)} // Nhấn vào nút Sửa
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(banner.id)} // Nhấn vào nút Xóa
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Banner Form */}
      {!editingBanner && (
        <>
          <h4>Thêm Banner</h4>
          <AddBannerForm fetchBanners={fetchBanners} />
        </>
      )}

      {/* Edit Banner Form */}
      {editingBanner && (
        <>
          <h4>Sửa Banner</h4>
          <EditBannerForm
            fetchBanners={fetchBanners}
            banner={editingBanner}
            setEditingBanner={setEditingBanner}
          />
        </>
      )}
    </div>
  );
};

const AddBannerForm = ({ fetchBanners }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề là bắt buộc"),
    description: Yup.string().required("Mô tả là bắt buộc"),
    image: Yup.mixed().required("Hình ảnh là bắt buộc"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("file", values.image);

    try {
      const response = await fetch("http://14.225.29.33:81/api/banner/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await fetchBanners(); // Reload lại danh sách sau khi thêm thành công
        resetForm();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik
      initialValues={{ title: "", description: "", image: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="mb-3">
            <label className="form-label">Tiêu Đề</label>
            <Field
              type="text"
              name="title"
              className="form-control"
              placeholder="Nhập tiêu đề"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mô Tả</label>
            <Field
              as="textarea"
              name="description"
              className="form-control"
              placeholder="Nhập mô tả"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Hình Ảnh</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                setFieldValue("image", e.target.files[0]);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Thêm Banner
          </button>
        </Form>
      )}
    </Formik>
  );
};



const EditBannerForm = ({ fetchBanners, banner, setEditingBanner }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề là bắt buộc"),
    description: Yup.string().required("Mô tả là bắt buộc"),
    image: Yup.mixed().notRequired(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);

    // Chỉ thêm ảnh mới vào formData nếu người dùng chọn ảnh mới
    if (values.image) {
      formData.append("file", values.image);
    }

    try {
      const response = await fetch(
        `http://14.225.29.33:81/api/banner/update/${banner.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        await fetchBanners(); // Reload lại danh sách sau khi sửa thành công
        setEditingBanner(null); // Reset state khi sửa xong
        resetForm();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: banner.title,
        description: banner.description,
        image: null, // Giữ trạng thái ảnh null nếu không có ảnh mới
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="mb-3">
            <label className="form-label">Tiêu Đề</label>
            <Field
              type="text"
              name="title"
              className="form-control"
              placeholder="Nhập tiêu đề"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mô Tả</label>
            <Field
              as="textarea"
              name="description"
              className="form-control"
              placeholder="Nhập mô tả"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Hình Ảnh</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                setFieldValue("image", e.target.files[0]);
              }}
            />
            {/* Hiển thị ảnh cũ nếu không có ảnh mới */}
            {banner.imageUrl && !values.image && (
              <div className="mt-2">
                <img src={banner.imageUrl} alt="Current banner" width="100" />
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Cập Nhật Banner
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setEditingBanner(null)} // Hủy sửa
          >
            Hủy
          </button>
        </Form>
      )}
    </Formik>
  );
};


export default BannerManagement;
