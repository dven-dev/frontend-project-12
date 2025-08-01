const rollbarConfig = {
  accessToken: 'f26c5f32bd1e445b9e88d8a180c9c532',
  // Определяем окружение в зависимости от того, где запускается приложение
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // Включаем Rollbar только в production или для тестирования
  enabled: true,
  captureUncaught: true,
  captureUnhandledRejections: true,
  // Дополнительные настройки
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
