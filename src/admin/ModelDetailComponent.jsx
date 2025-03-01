import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash, FaDatabase, FaArrowLeft } from "react-icons/fa";
import { setSelectedOrderId } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal } from "bootstrap";

const API_URL = "http://localhost:81/api/model-details";

const ModelDetailComponent = () => {
  const [modelDetails, setModelDetails] = useState([]);
  const [editingDetail, setEditingDetail] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    activeFlag: true,
    deleteFlag: false,
  });

  const dispatch = useDispatch();
  const selectedOrderId = useSelector((state) => state.user.selectedOrderId);

  useEffect(() => {
    fetchModelDetails();
  }, []);

  const handleBack = () => {
    dispatch(setSelectedOrderId(null));
  };

  const fetchModelDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/by-model/${selectedOrderId}`);
      setModelDetails(response.data);
    } catch (error) {
      console.error("Error fetching model details:", error);
    }
  };

  const handleEdit = (detail) => {
    setEditingDetail(detail);
    setEditForm({
      id: detail.id,
      name: detail.name,
      activeFlag: detail.activeFlag,
      deleteFlag: detail.deleteFlag,
    });

    // ✅ Initialize and Show Bootstrap Modal Properly
    const modalElement = document.getElementById("editModal");
    const modalInstance = new Modal(modalElement); // Using Bootstrap Modal Class
    modalInstance.show();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editForm.id}`, editForm);
      setModelDetails(modelDetails.map(detail => detail.id === editForm.id ? editForm : detail));
      setEditingDetail(null);

      // ✅ Properly Hide Modal After Update
      const modalElement = document.getElementById("editModal");
      const modalInstance = Modal.getInstance(modalElement); // Get modal instance
      modalInstance.hide();

      console.log("Updated model detail:", editForm);
    } catch (error) {
      console.error("Error updating model detail:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setModelDetails(modelDetails.filter(detail => detail.id !== id));
        console.log("Deleted model detail with ID:", id);
      } catch (error) {
        console.error("Error deleting model detail:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <FaDatabase className="me-2" /> Danh sách Model Details
        </div>
        <div className="card-body">
          <button className="btn btn-secondary mb-3" onClick={handleBack}>
            <FaArrowLeft /> Quay lại
          </button>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                 
                  <th>Active</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {modelDetails.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted">Không có dữ liệu</td>
                  </tr>
                ) : (
                  modelDetails.map((detail) => (
                    <tr key={detail.id}>
                      <td>{detail.id}</td>
                      <td>{detail.name}</td>
                  
                      <td>
                        {detail.activeFlag ? (
                          <FaCheckCircle className="text-success" />
                        ) : (
                          <FaTimesCircle className="text-danger" />
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(detail)}
                          className="btn btn-warning btn-sm me-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(detail.id)}
                          className="btn btn-danger btn-sm"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bootstrap Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="editModalLabel">Chỉnh sửa Model Detail</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Tên:</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="activeFlag"
                  name="activeFlag"
                  checked={editForm.activeFlag}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="activeFlag">
                  Active
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Hủy
              </button>
              <button type="button" className="btn btn-success" onClick={handleUpdate}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ModelDetailComponent;
