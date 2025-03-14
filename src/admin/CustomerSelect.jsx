import Select from "react-select";
import { ErrorMessage } from "formik";

const CustomerSelect = ({ customers, setFieldValue, error }) => {
  const options = customers
    .filter((customer) => customer.customerCode)
    .map((customer) => ({
      value: customer.id,
      label: `${customer.customerCode}`,
    }));

  return (
    <div className="col-md-6">
      <label className="form-label">
        Mã Khách Hàng <span className="text-danger">*</span>
      </label>
      <Select
        options={options}
        placeholder="Chọn Khách Hàng"
        onChange={(selectedOption) => setFieldValue("userId", selectedOption?.value)}
        isSearchable
      />
      {/* Hiển thị lỗi nếu userId không được chọn */}
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  );
};

export default CustomerSelect;
