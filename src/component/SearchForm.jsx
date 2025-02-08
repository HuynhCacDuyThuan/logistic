import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/SearchForm.css'
const SearchForm = () => {
  const [activeTab, setActiveTab] = useState('search'); // Tab hiện tại

  // Xử lý chuyển đổi giữa các tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Xử lý tìm kiếm sản phẩm
  const handleSearchProduct = () => {
    alert('Tìm kiếm sản phẩm');
  };

  // Xử lý tra cứu mã vận đơn
  const handleTrackOrder = () => {
    alert('Tra cứu mã vận đơn');
  };

  return (
    <div className="container py-4 bg-light border border-primary rounded shadow">
      {/* Tab Navigation */}
      <div className="fil-top">
        <ul className="nav nav-tabs border-bottom-0">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => handleTabClick('search')}
              role="button"
            >
              <i className="fa fa-search"></i> Tìm kiếm sản phẩm
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'tracking' ? 'active' : ''}`}
              onClick={() => handleTabClick('tracking')}
              role="button"
            >
              <i className="fa fa-truck"></i> Tra cứu mã vận đơn
            </a>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="fil-body mt-4">
        {/* Tìm kiếm sản phẩm */}
        {activeTab === 'search' && (
          <div className="fil-panel">
            <div className="fil-form">
              <div className="d-flex gap-3 mb-3">
                <select className="form-select border-2" aria-label="Chọn trang web">
                  <option value="taobao" selected>
                    TAOBAO
                  </option>
                  <option value="tmall">TMALL</option>
                  <option value="1688">1688</option>
                </select>
                <input
                  type="text"
                  className="form-control border-2"
                  placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm"
                />
              </div>
              <button className="btn btn-primary mt-3 px-4 py-2" onClick={handleSearchProduct}>
                <i className="fa fa-search"></i> Tìm kiếm sản phẩm
              </button>
            </div>
          </div>
        )}

        {/* Tra cứu mã vận đơn */}
        {activeTab === 'tracking' && (
          <div className="fil-panel">
            <div className="fil-form">
              <input
                type="text"
                className="form-control border-2 mb-3"
                placeholder="Nhập mã vận đơn bạn muốn tìm kiếm"
              />
              <button className="btn btn-primary mt-3 px-4 py-2" onClick={handleTrackOrder}>
                <i className="fa fa-search"></i> Tra cứu mã vận đơn
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
