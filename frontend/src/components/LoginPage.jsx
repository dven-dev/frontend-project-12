import React, { useRef, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  FloatingLabel,
  Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import routes from '../routes.js';
import avatarImg from '../assets/avatar.jpg';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setAuthFailed(false);
    try {
      const response = await axios.post(routes.loginPath(), values);
      localStorage.setItem('token', response.data.token);
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (error) {
      if (error.response?.status === 401) {
        setAuthFailed(true);
        inputRef.current?.select();
      } else {
        throw error;
      }
    }
    setSubmitting(false);
  };

  return (
    <Container className="h-100 d-flex flex-column">
      <Row className="h-100 justify-content-center align-content-center">
        <Col xs={12} md={10} xxl={8}>
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatarImg} alt="Войти" className="rounded-circle" />
              </div>
              <div className="col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">Войти</h1>

                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <FloatingLabel
                        controlId="username"
                        label="Ваш ник"
                        className="mb-3"
                      >
                        <Form.Control
                          name="username"
                          autoComplete="username"
                          required
                          placeholder="Ваш ник"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={
                            authFailed || (touched.username && !!errors.username)
                          }
                          ref={inputRef}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="password"
                        label="Пароль"
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          name="password"
                          autoComplete="current-password"
                          required
                          placeholder="Пароль"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={
                            authFailed || (touched.password && !!errors.password)
                          }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {authFailed
                            ? 'Неверные имя пользователя или пароль'
                            : errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="outline-primary"
                        className="w-100 mb-3"
                      >
                        Войти
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="card-footer p-4 text-center">
              <span>Нет аккаунта? </span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
