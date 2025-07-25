import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel, fetchChannels, fetchMessages } from '../slices/chatSlice.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const channels = useSelector((state) => state.chat.channels);
  const messagesByChannel = useSelector((state) => state.chat.messagesByChannel);

  const messages = currentChannelId ? messagesByChannel[currentChannelId] ?? [] : [];
  
  console.log('channels:', channels);
  console.log('currentChannelId:', currentChannelId);
  console.log('messages:', messages);

  const messagesBoxRef = useRef(null);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchMessages(currentChannelId));
    }
  }, [currentChannelId, dispatch]);

  useEffect(() => {
    messagesBoxRef.current?.scrollTo({
      top: messagesBoxRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelName = currentChannel?.name ?? '...';

  const onSelectChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => alert('Добавить канал пока не реализовано')}>+</button>
          </div>
          <Channels
            channels={channels}
            currentChannelId={currentChannelId}
            onSelectChannel={onSelectChannel}
          />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># {channelName}</b>
              </p>
              <span className="text-muted">{messages.length} сообщений</span>
            </div>
            <div ref={messagesBoxRef} className="chat-messages overflow-auto px-5">
              <Messages messages={messages} />
            </div>
            <div className="mt-auto px-5 py-3">
              <form noValidate className="py-1 border rounded-2" onSubmit={(e) => {
                e.preventDefault();
                alert('Отправка сообщений пока не реализована');
              }}>
                <div className="input-group has-validation">
                  <input
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    disabled
                  />
                  <button type="submit" className="btn btn-group-vertical border-0" disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-right-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M8.354 11.354a.5.5 0 0 1-.708-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 4.5 8z"
                      />
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
