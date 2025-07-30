// components/modals/RemoveChannelModal.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../slices/channelsSlice.js';

const RemoveChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    try {
      await dispatch(deleteChannel(channel.id)).unwrap();
      onHide();
    } catch (error) {
      console.error('Ошибка удаления канала:', error);
    }
  };

  if (!show || !channel) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Удалить канал</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Закрыть"
              onClick={onHide}
            />
          </div>
          <div className="modal-body">
            <p>Уверены?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Отменить
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirm}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveChannelModal;
