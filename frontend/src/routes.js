// routes.js - теперь возвращаем относительные пути
// поскольку baseURL уже настроен в axiosConfig.js
const routes = {
  loginPath: () => '/login',
  signupPath: () => '/signup',
  dataPath: () => '/data', // получение всех данных сразу
  channelsPath: () => '/channels', // REST API для каналов
  messagesPath: () => '/messages', // REST API для сообщений
}

export default routes
