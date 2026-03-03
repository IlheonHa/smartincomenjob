
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Global error handling for better debugging
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  alert(`시스템 오류(Promise): ${event.reason?.message || '알 수 없는 오류'}`);
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  alert(`시스템 오류(Runtime): ${event.message || '알 수 없는 오류'}`);
});

root.render(
  <App />
);
