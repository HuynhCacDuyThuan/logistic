import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ReconciliationManagement.css'; // File CSS tùy chỉnh
import { FiDownload, FiSearch } from 'react-icons/fi';
import AdminHeader from '../component/AdminHeader';

const ReconciliationManagement = () => {
  // State quản lý tìm kiếm và sắp xếp
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('fileName');
  const [sortDirection, setSortDirection] = useState('asc');

  // Dữ liệu mẫu
  const [data] = useState([
    { id: 1, fileName: 'Đối_soát_15122025.csv', creationDate: '15/12/2025', source: 'Nguồn A' },
    { id: 2, fileName: 'ĐG_20231023123456_NVC', creationDate: '23/10/2023', source: 'Nguồn B' },
    { id: 3, fileName: 'Đối_soát_16122025.csv', creationDate: '16/12/2025', source: 'Nguồn C' },
  ]);

  // Xử lý tìm kiếm
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Xử lý sắp xếp
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Lọc và sắp xếp dữ liệu
  const filteredData = data.filter(item =>
    item.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
        <AdminHeader/>

        <Container fluid className="mt-4">
      {/* Tiêu đề */}
      <Row className="mb-3">
        <Col>
          <h2 className="text-primary fw-bold">Quản lý đối soát</h2>
        </Col>
      </Row>

      {/* Thanh tìm kiếm và nút xuất dữ liệu */}
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="searchForm" className="d-flex">
              <Form.Control
                type="text"
                placeholder="Nhập tên file..."
                value={searchTerm}
                onChange={handleSearch}
                className="me-2 shadow-sm"
              />
              <Button variant="outline-primary" className="shadow-sm">
              <FiSearch />
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="primary" className="shadow-sm">
            <FiDownload className="me-2" />
            Xuất dữ đối soát
          </Button>
        </Col>
      </Row>

      {/* Bảng dữ liệu */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead className="bg-light">
                  <tr>
                    <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                      STT {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('fileName')} style={{ cursor: 'pointer' }}>
                      Tên file {sortColumn === 'fileName' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('creationDate')} style={{ cursor: 'pointer' }}>
                      Ngày tạo {sortColumn === 'creationDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('source')} style={{ cursor: 'pointer' }}>
                      Người tạo {sortColumn === 'source' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.length > 0 ? (
                    sortedData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.fileName}</td>
                        <td>{item.creationDate}</td>
                        <td>{item.source}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Không tìm thấy dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ReconciliationManagement;