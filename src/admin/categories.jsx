import React, { useState } from 'react';
import AdminHeader from '../component/AdminHeader';

// Dummy data for categories
const categories = [
  { id: 1, name: 'Electronics', parent: null },
  { id: 2, name: 'Clothing', parent: null },
  { id: 3, name: 'Mobile Phones', parent: 1 },
  { id: 4, name: 'Laptops', parent: 1 },
];

const CategoryManagement = () => {
  const [categoryList, setCategoryList] = useState(categories);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', parent: null });

  // Handle Add/Edit Category
  const handleAddEditCategory = (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Edit existing category
      const updatedCategories = categoryList.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, ...newCategory } : cat
      );
      setCategoryList(updatedCategories);
    } else {
      // Add new category
      const newId = categoryList.length + 1;
      const newCategoryData = { id: newId, ...newCategory };
      setCategoryList([...categoryList, newCategoryData]);
    }
    setNewCategory({ name: '', parent: null });
    setEditingCategory(null);
  };

  // Handle Edit Category
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, parent: category.parent });
  };

  // Handle Delete Category
  const handleDeleteCategory = (id) => {
    const updatedCategories = categoryList.filter((cat) => cat.id !== id);
    setCategoryList(updatedCategories);
  };

  return (
  <div>

<div className="container my-5">
    

    {/* Category List */}
    <div className="mb-4">
      <h4>Danh Sách Danh Mục</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tên Danh Mục</th>
            <th>Danh Mục Cha</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.parent ? categories.find((cat) => cat.id === category.parent).name : 'None'}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEditCategory(category)}>
                  Sửa
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Add/Edit Category Form */}
    <div className="mb-4">
      <h4>{editingCategory ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}</h4>
      <form onSubmit={handleAddEditCategory}>
        <div className="mb-3">
          <label className="form-label">Tên Danh Mục</label>
          <input
            type="text"
            className="form-control"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Danh Mục Cha</label>
          <select
            className="form-select"
            value={newCategory.parent || ''}
            onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value })}
          >
            <option value="">Chọn Danh Mục Cha</option>
            {categoryList
              .filter((cat) => !cat.parent)
              .map((parentCategory) => (
                <option key={parentCategory.id} value={parentCategory.id}>
                  {parentCategory.name}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {editingCategory ? 'Lưu Thay Đổi' : 'Thêm Danh Mục'}
        </button>
      </form>
    </div>
  </div>

  </div>
  );
};

export default CategoryManagement;
