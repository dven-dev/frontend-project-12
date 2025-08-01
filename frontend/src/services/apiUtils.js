// Создайте этот файл: src/utils/apiUtils.js
const getApiUrl = () => {
  // В development режиме всегда используем proxy
  if (import.meta.env.DEV) {
    return '/api/v1';
  }
  
  // В production
  return '/api/v1';
};

const getSocketUrl = () => {
  // В development режиме используем прямое подключение
  if (import.meta.env.DEV) {
    return 'http://localhost:5001';
  }
  
  // В production используем origin
  return window.location.origin;
};

export { getApiUrl, getSocketUrl };
