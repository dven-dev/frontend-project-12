import { getApiUrl } from './services/apiUtils.js';

const routes = {
  loginPath: () => `${getApiUrl()}/login`,
  signupPath: () => `${getApiUrl()}/signup`,
  channelsPath: () => `${getApiUrl()}/channels`,
  messagesPath: () => `${getApiUrl()}/messages`,
};

export default routes;
