import React, { useRef, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FloatingLabel,
  Form,
} from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import routes from '../routes.js'
import avatarImg from '../assets/avatar.jpg'
import { loginSuccess } from '../slices/authSlice.js'

const LoginPage = () => {
  const { t } = useTranslation()
  const [authFailed, setAuthFailed] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('requiredField')),
    password: Yup.string().required(t('requiredField')),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setAuthFailed(false)
    try {
      const response = await axios.post(routes.loginPath(), values)
      const { token, username } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('username', username)

      dispatch(loginSuccess({ token, username }))

      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (error) {
      if (error.response?.status === 401) {
        setAuthFailed(true)
        inputRef.current?.select()
      } else {
        throw error }
    }
    setSubmitting(false)
  }

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={avatarImg} alt={t('login')} className="rounded-circle" />
              </Col>
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
                  <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('login')}</h1>

                    <FloatingLabel
                      controlId="username"
                      label={t('yourNickname')}
                      className="mb-3"
                    >
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        required
                        placeholder={t('yourNickname')}
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
                      label={t('password')}
                      className="mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder={t('password')}
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={
                          authFailed || (touched.password && !!errors.password)
                        }
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {authFailed
                          ? t('wrongCredentials')
                          : errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="outline-primary"
                      className="w-100 mb-3"
                    >
                      {t('login')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('noAccount')}</span>
                {' '}
                <a href="/signup">{t('registration')}</a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
