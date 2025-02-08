import React from 'react';

const Services = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-sm-3 mb-4">
          <div className="card d-flex h-100">
            <a
              href="https://chuyenphatquocte.com/chuyen-phat-nhanh-quoc-te/"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <img
                className="card-img-top"
                src="https://chuyenphatquocte.com/wp-content/uploads/2018/05/dich-vu-chuyen-phat-nhanh1.jpg"
                alt="Chuyển Phát Nhanh Quốc Tế"
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">Chuyển phát nhanh quốc tế</h5>
                <p className="card-text">
                  <a href="https://vanchuyentrungquoc.com/" style={{ textDecoration: 'none', color: 'black' }}>
                    <strong>Tài Lộc Logistics</strong>
                  </a>{' '}
                  nhận gửi thư, tài liệu, chuyển phát nhanh hàng hóa đi quốc tế chuyên tuyến DHL. Giao hàng tận tay, thời gian vận chuyển nhanh nhất.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="col-sm-3 mb-4">
          <div className="card d-flex h-100">
            <a
              href="https://chuyenphatquocte.com/chuyen-phat-nhanh-di-trung-quoc"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <img
                className="card-img-top"
                src="https://chuyenphatquocte.com/wp-content/uploads/2018/05/chuyen-phat-nhanh-di-trung-quoc-01.jpg"
                alt="Chuyển Phát Nhanh đi Trung Quốc"
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">Chuyển phát nhanh đi Trung Quốc</h5>
                <p className="card-text">
                  Nhận chuyển phát nhanh đi Trung Quốc tất cả các loại hàng hóa, thư từ, bưu phẩm đi tất cả các tỉnh ở Trung Quốc.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="col-sm-3 mb-4">
          <div className="card d-flex h-100">
            <a
              href="https://chuyenphatquocte.com/dat-mua-hang-trung-quoc/"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <img
                className="card-img-top"
                src="https://chuyenphatquocte.com/wp-content/uploads/2018/05/nhap-hang-trung-quoc-chinh-nghach-min.jpg"
                alt="Đặt Mua Hàng Trung Quốc"
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">Đặt mua hàng Trung Quốc</h5>
                <p className="card-text">
                  Nhận đặt mua hàng từ các trang thương mại điện tử Trung Quốc như: Taobao, 1688, Tmall,…Dịch vụ vận chuyển hàng Trung Quốc- Việt Nam giá rẻ.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="col-sm-3 mb-4">
          <div className="card d-flex h-100">
            <a
              href="https://chuyenphatquocte.com/nhap-khau-chinh-ngach-hang-trung-quoc/"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <img
                className="card-img-top"
                src="https://chuyenphatquocte.com/wp-content/uploads/2018/05/ke-khai-hai-quan-min.jpg"
                alt="Nhập Khẩu Chính Ngạch Hàng Trung Quốc"
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">Nhập khẩu chính ngạch hàng Trung Quốc</h5>
                <p className="card-text">
                  Nhập khẩu chính ngạch hàng Trung Quốc, dịch vụ uỷ thác xuất nhập khẩu chuyên nghiệp, Tài Lộc Logistics nhận xuất nhập khẩu hàng hoá, kê khai thủ tục hải quan.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Nút Xem Chi Tiết nằm ngoài các card */}
      <div className="text-center my-4">
        <a
          href="/Dich-vu"
          className="btn btn-primary"
          style={{ textDecoration: 'none' }}
        >
          Xem chi tiết  dịch vụ
        </a>
      </div>
    </div>
  );
};

export default Services;
