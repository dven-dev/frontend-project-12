import React, { useRef, useEffect } from 'react'
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { renameChannel } from '../../slices/channelsSlice.js'
import { cleanWithAsterisks } from '../../services/profanityFilter.js'

const RenameChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { channels } = useSelector(state => state.channels)
  const inputRef = useRef()

  const channelNames = channels
    .filter(ch => ch.id !== channel?.id)
    .map(ch => ch.name)

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
        inputRef.current?.select()
      }, 100)
    }
  }, [show])

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!channel) return

    try {
      const cleanedName = cleanWithAsterisks(values.name.trim())

      await dispatch(renameChannel({
        id: channel.id,
        name: cleanedName,
      })).unwrap()

      toast.success(t('channelRenamed'))
      onHide()
    }
    catch (error) {
      console.error('Ошибка переименования канала:', error)
      toast.error(t('channelRenameError'));
    }
    finally {
      setSubmitting(false)
    }
  }

  if (!channel) return null

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: channel.name || '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
                disabled={isSubmitting || !values.name.trim() || values.name === channel.name}
              >
                {t('rename')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default RenameChannelModal
