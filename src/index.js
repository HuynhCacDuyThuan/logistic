import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import Google OAuth provider
import { Provider } from 'react-redux'; // Import Redux Provider
import { store, persistor } from './store'; // Import persisted store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

const clientId = '426506381220-6t8e61jh0ru9v7gu6rf8ssfid7sd71ke.apps.googleusercontent.com'; // Thay thế với clientId của bạn từ Google Developer Console

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Bao bọc toàn bộ ứng dụng trong GoogleOAuthProvider và Provider */}
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}> {/* Redux Provider để quản lý trạng thái */}
        <PersistGate loading={null} persistor={persistor}>
         
            <App />
         
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Nếu bạn muốn bắt đầu đo hiệu suất trong ứng dụng của mình, truyền một hàm
// để ghi kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi tới một endpoint phân tích. Tìm hiểu thêm: https://bit.ly/CRA-vitals
reportWebVitals();
