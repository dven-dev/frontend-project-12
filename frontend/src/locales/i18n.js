import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      
      requiredField: 'Обязательное поле',
      cancel: 'Отменить',
      create: 'Создать',
      rename: 'Переименовать',
      remove: 'Удалить',
      appName: 'Hexlet Chat',
      
     
      login: 'Войти',
      yourNickname: 'Ваш ник',
      password: 'Пароль',
      wrongCredentials: 'Неверные имя пользователя или пароль',
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      
     
      signup: 'Регистрация',
      signupButton: 'Зарегистрироваться',
      username: 'Имя пользователя',
      confirmPassword: 'Подтвердите пароль',
      usernameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      passwordsMustMatch: 'Пароли должны совпадать',
      userAlreadyExists: 'Такой пользователь уже существует',
      registrationError: 'Ошибка регистрации',
      alreadyHaveAccount: 'Уже есть аккаунт?',
      
     
      channels: 'Каналы',
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      channelName: 'Имя канала',
      channelNameLength: 'От 3 до 20 символов',
      channelMustBeUnique: 'Должно быть уникальным',
      removeChannelConfirm: 'Уверены?',
      
     
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
      channelCreateError: 'Ошибка создания канала',
      channelRenameError: 'Ошибка переименования канала',
      channelRemoveError: 'Ошибка удаления канала',
      
    
      networkError: 'Ошибка соединения',
      loadingError: 'Ошибка загрузки данных',
      connectionLost: 'Соединение потеряно',
      connectionRestored: 'Соединение восстановлено',
      
      
      enterMessage: 'Введите сообщение...',
      sendMessage: 'Отправить',
      newMessage: 'Новое сообщение',
      noMessages: 'Пока нет сообщений...',
      
      messagesCount: '{{count}} сообщение',
      messagesCount_zero: '{{count}} сообщений',
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
      messageSent: 'Сообщение отправлено',
      messageSendError: 'Ошибка отправки сообщения',
      noMessagesYet: 'Напишите первым!',
      
     
      notFound: 'Страница не найдена',
      backToMain: 'На главную',
      
     
      hexletChat: 'Hexlet Chat',
      logout: 'Выйти',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    
    pluralSeparator: '_',
    contextSeparator: '_',
  });

export default i18n;
