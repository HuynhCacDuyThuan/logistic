import Select from "react-select";

const CustomerSelectEdit = ({ customers, selectedUserId, setFieldValue, error }) => {
  // Kiểm tra xem customers có phải là mảng không
  if (!Array.isArray(customers)) {
    console.error("customers is not an array:", customers);
    return <div>Đã xảy ra lỗi khi tải dữ liệu khách hàng.</div>;
  }

  // Tạo danh sách options từ customers
  const options = customers
    .filter((customer) => customer.customerCode) // Lọc những khách hàng có customerCode
    .map((customer) => ({
      value: customer.id,
      label: `${customer.customerCode}`,
    }));

  // Tìm option phù hợp với selectedUserId
  const selectedOption = options.find((option) => option.value === selectedUserId) || null;

  return (
    <div className="col-md-6">
      <label className="form-label">
        Mã Khách Hàng <span className="text-danger">*</span>
      </label>
      <Select
        options={options}
        placeholder="Chọn Khách Hàng"
        value={selectedOption} // Đặt giá trị mặc định
        onChange={(selectedOption) => setFieldValue("userId", selectedOption?.value)}
        isSearchable
      />
      {/* Hiển thị lỗi nếu userId không được chọn */}
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  );
};

export default CustomerSelectEdit;