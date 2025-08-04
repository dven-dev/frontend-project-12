# Чат

Многофункциональный чат с авторизацией, регистрацией, каналами и сообщениями

### Hexlet tests and linter status:
[![Actions Status](https://github.com/dven-dev/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/dven-dev/frontend-project-12/actions)
[![Maintainability](https://qlty.sh/gh/dven-dev/projects/frontend-project-12/maintainability.svg)](https://qlty.sh/gh/dven-dev/projects/frontend-project-12)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dven-dev_frontend-project-12&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dven-dev_frontend-project-12)

## Демонстрация:

https://frontend-project-12-zk4k.onrender.com/

## Функциональность

- Регистрация / авторизация
- Создание, переименование и удаление каналов
- Отправка и просмотр сообщений
- Обработка ошибок и уведомления
- Поддержка русского языка (i18n)
- Реализация через WebSocket (Socket.IO)

## Стек технологий

- **React 18**
- **Vite**
- **Redux Toolkit + RTK Query**
- **React Bootstrap**
- **i18next**
- **Formik** + **Yup**
- **Axios**
- **Socket.IO**
- **React Router**
- **@hexlet/chat-server** (бэкенд)

## Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/dven-dev/frontend-project-12.git
cd frontend-project-12

# Установить зависимости frontend
cd frontend
npm install

# В корне проекта запустить сервер
cd ..
npx @hexlet/chat-server

# В другом терминале — запустить frontend
cd frontend
npm run dev

# По умолчанию сервер запускается на http://localhost:5001, а фронтенд — на http://localhost:5173
