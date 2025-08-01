const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN, // ✅ так правильно в Vite
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbarConfig;
