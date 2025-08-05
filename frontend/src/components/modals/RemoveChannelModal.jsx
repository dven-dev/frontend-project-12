import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { deleteChannel } from '../../slices/channelsSlice.js'

const RemoveChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()

  const handleConfirm = async () => {
    if (!channel) return

    setIsSubmitting(true)
    try {
      await dispatch(deleteChannel(channel.id)).unwrap()
      toast.success(t('channelRemoved'))
      onHide()
    }
    catch (error) {
      console.error('Ошибка удаления канала:', error)
      toast.error(t('channelRemoveError'))
    }
    finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onHide()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('removeChannelConfirm')}</p>
        {channel && (
          <p className="text-muted">
            <strong>
              #
              {channel.name}
            </strong>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          {t('cancel')}
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {t('remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
