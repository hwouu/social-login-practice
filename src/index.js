import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // 이 줄이 있는지 확인

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);