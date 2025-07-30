// components/modals/RenameChannelModal.jsx
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { renameChannel } from '../../slices/channelsSlice.js';

const RenameChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels);
  const inputRef = useRef();

  const channelNames = channels
    .filter(ch => ch.id !== channel?.id)
    .map(ch => ch.name);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [show]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(renameChannel({
        id: channel.id,
        name: values.name,
      })).unwrap();
      onHide();
    } catch (error) {
      console.error('Ошибка переименования канала:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!show || !channel) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Переименовать канал</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Закрыть"
              onClick={onHide}
            />
          </div>
          <Formik
            initialValues={{ name: channel.name }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Имя канала
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="form-control"
                      ref={inputRef}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onHide}
                    disabled={isSubmitting}
                  >
                    Отменить
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Отправить
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RenameChannelModal;
