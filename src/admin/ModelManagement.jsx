import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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

  // Chuyển đổi định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Lấy phần ngày "yyyy-MM-dd"
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

  const handleIDClick = (id) => {
    const model = models.find((model) => model.id === id);
    setSelectedModel(model);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedModel(null);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Model</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Lưu thay đổi' : 'Lưu'}
        </button>
      </form>

     

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
                  <th>Modified Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id}>
                    <td
                      style={{ cursor: 'pointer', color: 'blue' }}
                      onClick={() => handleIDClick(model.id)}
                    >
                      {model.id}
                    </td>
                    <td>{model.name}</td>
                    <td>{model.createdBy}</td>
                    <td>{formatDate(model.createdDate)}</td> {/* Chuyển đổi ngày */}
                    <td>{formatDate(model.modifiedDate) || 'N/A'}</td> {/* Chuyển đổi ngày */}
                    <td>
                      <button
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
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedModel && (
        <div
          className="modal show"
          style={{ display: 'block', backdropFilter: 'blur(1px)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Model Details - {selectedModel.name}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedModel.id}</p>
                <p><strong>Model status:</strong> {selectedModel.name}</p>
                <div className="mb-3">
                  <label htmlFor="modelName" className="form-label">Model Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modelName"
                    value={selectedModel.name}
                    onChange={(e) => setSelectedModel(prev => ({
                      ...prev,
                      name: e.target.value
                    }))} 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelManagement;
