const apiBase = '/api/v1';

const routes = {
  loginPath: () => `${apiBase}/login`,
  channelsPath: () => `${apiBase}/channels`,
  usersPath: () => `${apiBase}/users`,
  messagesPath: () => `${apiBase}/messages`,
};

export default routes;

