import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch } from 'react-redux';
import { setSelectedOrderId } from '../redux/userSlice';
import Header from '../component/Header';
import AdminHeader from '../component/AdminHeader';

const ModelManagement = () => {
  const [models, setModels] = useState([]);
  const [name, setName] = useState('');
  const [activeFlag, setActiveFlag] = useState(true);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [createdBy, setCreatedBy] = useState('admin');
  const [modifiedBy, setModifiedBy] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch(); // Khởi tạo useDispatch
  // Chuyển đổi định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Lấy phần ngày "yyyy-MM-dd"
  };

  const [formData, setFormData] = useState({
    name: ""
  });

  const handleAddClick = (modelId) => {
    setSelectedModel(models.find((model) => model.id === modelId)); // Lưu model được chọn
    setShowModal(true);
  };
  

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: ""}); // Reset form khi đóng modal
  };

  const handleSave = async () => {
    if (!selectedModel) {
      console.error("Model ID is missing!");
      return;
    }
  
    try {
      const response = await axios.post("http://14.225.29.33:81/api/model-details", {
        name: formData.name,
        modelId: selectedModel.id, // Gửi ID của Model
        activeFlag: true,
        deleteFlag: false,
        createdBy: "admin"
      });
  
      console.log("Data saved:", response.data);
  
      // Cập nhật danh sách ModelDetail nếu cần
   
  
      // Đóng modal sau khi lưu thành công
      setShowModal(false);
      setFormData({ name: "" }); // Reset form
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('http://14.225.29.33:81/api/models/active');
        setModels(response.data);
      } catch (error) {
        console.error('There was an error fetching the models:', error);
      }
    };

    fetchModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modelData = {
      name,
      activeFlag,
      deleteFlag,
      createdBy,
      modifiedBy,
      createdDate: createdDate || new Date(),
      modifiedDate,
    };

    try {
      if (isEditing && selectedModel) {
        const response = await axios.put(`http://14.225.29.33:81/api/models/${selectedModel.id}`, modelData);
        setModels(models.map((model) =>
          model.id === selectedModel.id ? response.data : model
        ));
        setIsEditing(false);
      } else {
        const response = await axios.post('http://14.225.29.33:81/api/models', modelData);
        setModels([...models, response.data]);
      }
      clearForm();
    } catch (error) {
      console.error("There was an error submitting the model:", error);
    }
  };

  const clearForm = () => {
    setName('');
    setActiveFlag(true);
    setDeleteFlag(false);
    setCreatedBy('admin');
    setModifiedBy('');
    setCreatedDate('');
    setModifiedDate('');
  };

  const handleDelete = async (id) => {
    // Xác nhận xóa
    try {
      // Gọi API DELETE để xóa model
      await axios.delete(`http://14.225.29.33:81/api/models/${id}`);
  
      // Cập nhật lại state models sau khi xóa thành công
      setModels(models.filter(model => model.id !== id));
     
    } catch (error) {
      console.error('Error deleting model:', error);
   
    }
  };
  

  const handleEdit = (id) => {
    const modelToEdit = models.find((model) => model.id === id);
    if (modelToEdit) {
      setName(modelToEdit.name);
      setActiveFlag(modelToEdit.activeFlag);
      setDeleteFlag(modelToEdit.deleteFlag);
      setCreatedBy(modelToEdit.createdBy);
      setModifiedBy(modelToEdit.modifiedBy);
      setCreatedDate(modelToEdit.createdDate);
      setModifiedDate(modelToEdit.modifiedDate);
      setSelectedModel(modelToEdit);
      setIsEditing(true);
    }
  };

  const handleIDClick = (model) => {
    dispatch(setSelectedOrderId(model.id)); // Cập nhật selectedOrderId khi nhấn vào ID
  };



  return (
   <div className=''>
   
    <div className="container mt-5">
      
     

      <div className="card shadow-lg mb-5">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Model Name</th>
                  <th>Created By</th>
                  <th>Created Date</th>
            
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id}>
                    <td
                      style={{ cursor: 'pointer', color: 'blue' }}
                      onClick={() => handleIDClick(model)}
                    >
                      {model.id}
                    </td>
                    <td>{model.name}</td>
                    <td>{model.createdBy}</td>
                    <td>{formatDate(model.createdDate)}</td> {/* Chuyển đổi ngày */}
                  
                    <td>

                    <button 
    onClick={() => handleAddClick(model.id)} 
    className="btn btn-success btn-sm me-2"
  >
    <i className="fas fa-plus"></i>
  </button>

                      {/* <button
                        onClick={() => handleEdit(model.id)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(model.id)}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fas fa-trash"></i>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm Model Detail</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
               
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
     
    </div>
   </div>
  );
};

export default ModelManagement;
