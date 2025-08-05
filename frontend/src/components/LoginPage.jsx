import React, { useRef, useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FloatingLabel,
  Form,
  Alert,
} from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../slices/authSlice.js'
import routes from '../routes.js'

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const validationSchema = yup.object().shape({
    username: yup.string().required('Required'),
    password: yup.string().required('Required'),
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
        throw error
      }
    }

    setSubmitting(false)
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={6} lg={5} className="shadow p-4">
          <Form onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Войти</h1>

            <FloatingLabel
              controlId="username"
              label="Ваш ник"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="username"
                autoComplete="username"
                required
                placeholder="Ваш ник"
                ref={inputRef}
                value={formik.values.username}
                onChange={formik.handleChange}
                isInvalid={
                  (formik.touched.username && !!formik.errors.username) ||
                  authFailed
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="password"
              label="Пароль"
              className="mb-4"
            >
              <Form.Control
                type="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Пароль"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={
                  (formik.touched.password && !!formik.errors.password) ||
                  authFailed
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button
              type="submit"
              variant="outline-primary"
              className="w-100 mb-3"
              disabled={formik.isSubmitting}
            >
              Войти
            </Button>

            {authFailed && (
              <Alert variant="danger" className="mb-0">
                Неверные имя пользователя или пароль
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
