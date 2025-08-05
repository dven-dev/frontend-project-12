import { useRef, useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FloatingLabel,
  Form,
  Alert,
} from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import routes from '../routes.js'
import avatarImg from '../assets/avatar_1.jpg'
import { loginSuccess } from '../slices/authSlice.js'

const SignupPage = () => {
  const { t } = useTranslation()
  const [signupFailed, setSignupFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('usernameLength'))
      .max(20, t('usernameLength'))
      .required(t('requiredField')),
    password: Yup.string()
      .min(6, t('passwordLength'))
      .required(t('requiredField')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('passwordsMustMatch'))
      .required(t('requiredField')),
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 100) 
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    setSignupFailed(false)
    setErrorMessage('')
    try {
      const { confirmPassword, ...signupData } = values
      const response = await axios.post(routes.signupPath(), signupData)
      const { token, username } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('username', username)

      dispatch(loginSuccess({ token, username }))

      navigate('/', { replace: true })
    }
    catch (error) {
      if (error.response?.status === 409) {
        setSignupFailed(true)
        setErrorMessage(t('userAlreadyExists'))
        inputRef.current?.select()
      }
      else {
        setSignupFailed(true)
        setErrorMessage(t('registrationError'))
      }
    }
    setSubmitting(false)
  }

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={avatarImg} alt={t('signup')} className="rounded-circle" />
              </div>
              <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit} noValidate className="w-50">
                    <h1 className="text-center mb-4">{t('signup')}</h1>

                    {signupFailed && (
                      <Alert variant="danger">
                        {errorMessage}
                      </Alert>
                    )}

                    <FloatingLabel
                      controlId="username"
                      label={t('username')}
                      className="mb-3"
                    >
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        placeholder={t('username')}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          signupFailed || (touched.username && !!errors.username)
                        }
                        ref={inputRef}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {signupFailed && !errors.username
                          ? errorMessage
                          : errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="password"
                      label={t('password')}
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        placeholder={t('password')}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          signupFailed || (touched.password && !!errors.password)
                        }
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="confirmPassword"
                      label={t('confirmPassword')}
                      className="mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder={t('confirmPassword')}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="outline-primary"
                      className="w-100"
                    >
                      {t('signupButton')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage
