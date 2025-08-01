const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN || 'f26c5f32bd1e445b9e88d8a180c9c532',
  environment: import.meta.env.VITE_ROLLBAR_ENVIRONMENT || (import.meta.env.PROD ? 'production' : 'development'),
  enabled: true,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
      }
    }
  }
};

export default rollbarConfig;
