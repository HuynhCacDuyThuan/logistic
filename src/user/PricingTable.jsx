import React from "react";
import Header from "../component/Header";

const PricingTable = () => {
  return (
  <div className="">
    
<div  className="header" >
    <Header/>
    </div>
  
  <div className="container my-5">
      <div className="border rounded shadow-lg bg-white p-4">
        <h2 className="text-center mb-4">Bảng Giá Cước Vận Chuyển</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Hạng mục</th>
                <th>Giá Hàng Nặng (VND/Kg)</th>
                <th>Giá Hàng Khối (VND/M3)</th>
                <th>Lưu ý</th> {/* Thêm cột lưu ý */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hàng phổ thông</td>
                <td>9,000</td>
                <td>2,000,000</td>
                <td rowSpan={6}>
                  {/* Lưu ý cho tất cả các mục */}
                  <ul>
                    <li>Trường hợp vận chuyển không may bị hỏng hóc, mất mát hàng, công ty sẽ đền bù x5 lần cước vận chuyển và không quá 3 triệu đồng nếu mua bảo hiểm 3% giá trị hàng.</li>
                    <li>Công Ty không nhận các loại mặt hàng sau: Rượu, Kem đánh răng senodyme, thuốc lá điện tử, Thuốc Tây, Đồ chơi bạo lực (Súng Kiếm...), Các Loại pháo, Thiết bị Y Tế, Pin, Sạc Dự Phòng, Điện Thoại.</li>
                    <li>Hàng Để vỡ: Khách hàng không đóng gỗ hoặc đóng pallet khi về Việt Nam bị vỡ, công ty sẽ không chịu trách nhiệm. Nếu khách hàng đã đóng gỗ mà bị hỏng hóc công ty sẽ đền bù theo quy định.</li>
                    <li>Giá cước vận chuyển trên chưa bao gồm cước vận chuyển nội địa Việt Nam.</li>
                    <li>Bảng giá trên là tương đối trong môi trường hợp cụ thể, quý khách hàng có thể liên hệ chăm sóc khách hàng để biết chi tiết cước vận chuyển.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Quần áo, Giày dép, Túi xách</td>
                <td>10,000</td>
                <td>2,000,000</td>
              </tr>
              <tr>
                <td>Mỹ phẩm, Hóa chất, Thực phẩm</td>
                <td>11,000</td>
                <td>2,300,000</td>
              </tr>
              <tr>
                <td>Hàng nặng có thể tích 1m3 = 400kg - 700kg</td>
                <td>9,000</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Hàng nặng có thể tích 1m3 = 700kg - 1000kg</td>
                <td>8,000</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Hàng nặng có thể tích 1m3 &gt; 1000kg</td>
                <td>7,000</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-center mt-3 text-muted">
          <em>
            Lưu ý: Giá cước trên bao gồm vận chuyển nội địa Việt Nam. Vui lòng liên hệ để biết thêm chi tiết.
          </em>
        </p>
      </div>
    </div>
   </div>
  );
};

export default PricingTable;
