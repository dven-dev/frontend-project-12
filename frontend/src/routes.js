const apiBase = '/api/v1';

const routes = {
  loginPath: () => `${apiBase}/login`,
  signupPath: () => `${apiBase}/signup`,
  channelsPath: () => `${apiBase}/channels`,
  usersPath: () => `${apiBase}/users`,
  messagesPath: () => `${apiBase}/messages`,
};

export default routes;

/* const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  
  // UI routes
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  homePath: () => '/',
};
*/
