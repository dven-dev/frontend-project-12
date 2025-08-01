// routes.js - исправленная версия
const getApiUrl = () => {
  if (window.location.hostname === 'localhost') {
    // Проверьте, что ваш бэкенд действительно запущен на порте 5001
    return 'http://localhost:5001/api/v1';
  }
  // Для продакшена используем относительный путь
  return '/api/v1';
};

const routes = {
  loginPath: () => `${getApiUrl()}/login`,
  signupPath: () => `${getApiUrl()}/signup`,
  channelsPath: () => `${getApiUrl()}/channels`,
  messagesPath: () => `${getApiUrl()}/messages`,
};

export default routes;
