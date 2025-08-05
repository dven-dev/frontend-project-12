import { useRef, useEffect } from 'react'
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { createChannel } from '../../slices/channelsSlice.js'
import { cleanWithAsterisks } from '../../services/profanityFilter.js'

const AddChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { channels } = useSelector(state => state.channels)
  const inputRef = useRef()

  const channelNames = channels.map(ch => ch.name)

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('channelNameLength'))
      .max(20, t('channelNameLength'))
      .notOneOf(channelNames, t('channelMustBeUnique'))
      .required(t('requiredField')),
  })

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [show])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const cleanedName = cleanWithAsterisks(values.name.trim())

      await dispatch(createChannel({ name: cleanedName })).unwrap()
      toast.success(t('channelCreated'))
      onHide()
    }
    catch (error) {
      console.error('Ошибка создания канала:', error)
      toast.error(t('channelCreateError'))
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
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
            <Modal.Body>
              <FloatingLabel
                controlId="name"
                label={t('channelName')}
                className="mb-3"
              >
                <Form.Control
                  name="name"
                  type="text"
                  placeholder={t('channelName')}
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                  disabled={isSubmitting}
                  ref={inputRef}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={onHide}
                disabled={isSubmitting}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !values.name.trim()}
              >
                {t('create')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddChannelModal
