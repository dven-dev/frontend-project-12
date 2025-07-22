import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginPage = () => (
  <div className="container mt-5">
    <h2>Вход</h2>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log('Форма отправлена:', values);
      }}
    >
      <Form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Имя пользователя</label>
          <Field name="username" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Пароль</label>
          <Field name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Войти</button>
      </Form>
    </Formik>
  </div>
);

export default LoginPage;
