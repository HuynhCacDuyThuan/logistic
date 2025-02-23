import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import Google OAuth provider
import { Provider } from 'react-redux'; // Import Redux Provider
import { store } from './store';


const clientId = '426506381220-6t8e61jh0ru9v7gu6rf8ssfid7sd71ke.apps.googleusercontent.com'; // Thay thế với clientId của bạn từ Google Developer Console

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Bao bọc toàn bộ ứng dụng trong GoogleOAuthProvider và Provider */}
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}> {/* Redux Provider để quản lý trạng thái */}
     
          <App />

      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
