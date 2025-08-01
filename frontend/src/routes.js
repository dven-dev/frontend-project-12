const getApiUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5001/api/v1';
  }
  return '/api/v1';
};

const routes = {
  loginPath: () => `${getApiUrl()}/login`,
  signupPath: () => `${getApiUrl()}/signup`,
  channelsPath: () => `${getApiUrl()}/channels`,
  messagesPath: () => `${getApiUrl()}/messages`,
};

export default routes;
