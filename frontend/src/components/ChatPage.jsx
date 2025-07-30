// components/ChatPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, setCurrentChannelId, addChannel, updateChannel, removeChannel } from '../slices/channelsSlice.js';
import { fetchMessages, addMessage, sendMessage } from '../slices/messagesSlice.js';
import socket from '../services/socket.js';
import AddChannelModal from './modals/AddChannelModal.jsx';
import RenameChannelModal from './modals/RenameChannelModal.jsx';
import RemoveChannelModal from './modals/RemoveChannelModal.jsx';
import ChannelDropdown from './ChannelDropdown.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId, loading: channelsLoading } = useSelector((state) => state.channels);
  const { messages, loading: messagesLoading, sending } = useSelector((state) => state.messages);
  const { username } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState('');
  
  // Состояния модальных окон
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  // Socket события
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket подключен');
    });

    socket.on('disconnect', () => {
      console.log('Socket отключен');
    });

    socket.on('connect_error', (error) => {
      console.log('Ошибка подключения:', error);
    });

    // Обработка сообщений
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    // Обработка каналов
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(updateChannel(channel));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('renameChannel');
      socket.off('removeChannel');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, [dispatch]);

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  // Отправка сообщения через HTTP API (не socket.emit!)
  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      return;
    }

    if (!currentChannelId) {
      return;
    }

    const messageData = {
      body: newMessage.trim(),
      channelId: currentChannelId,
      username: username || localStorage.getItem('username') || 'User',
    };

    try {
      await dispatch(sendMessage(messageData)).unwrap();
      setNewMessage('');
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  };

  // Переключение канала
  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannelId(channelId));
  };

  // Фильтрация сообщений по текущему каналу
  const currentMessages = messages.filter((msg) => 
    String(msg.channelId) === String(currentChannelId)
  );

  const currentChannel = channels.find(ch => ch.id === currentChannelId);

  // Обработчики модальных окон
  const handleShowAddModal = () => setShowAddModal(true);
  const handleHideAddModal = () => setShowAddModal(false);

  const handleShowRenameModal = (channel) => {
    setSelectedChannel(channel);
    setShowRenameModal(true);
  };
  const handleHideRenameModal = () => {
    setShowRenameModal(false);
    setSelectedChannel(null);
  };

  const handleShowRemoveModal = (channel) => {
    setSelectedChannel(channel);
    setShowRemoveModal(true);
  };
  const handleHideRemoveModal = () => {
    setShowRemoveModal(false);
    setSelectedChannel(null);
  };

  // Проверяем, является ли канал удаляемым (не дефолтный)
  const isChannelRemovable = (channel) => {
    // Каналы general и random нельзя удалять
    const defaultChannels = ['general', 'random'];
    return !defaultChannels.includes(channel.name) && channel.removable !== false;
  };

  // Проверяем, можно ли переименовать канал
  const isChannelRenamable = (channel) => {
    // Каналы general и random нельзя переименовывать
    const defaultChannels = ['general', 'random'];
    return !defaultChannels.includes(channel.name);
  };

  if (channelsLoading || messagesLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4 h-100 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {/* Левая панель - Каналы */}
        <div className="col-4 col-md-2 border-end px-0 bg-light h-100 d-flex flex-column">
          {/* Заголовок с кнопкой добавления */}
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={handleShowAddModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>

          {/* Список каналов */}
          <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels.map((channel) => (
              <li key={channel.id} className="nav-item w-100">
                <ChannelDropdown
                  channel={channel}
                  onRename={handleShowRenameModal}
                  onRemove={handleShowRemoveModal}
                  isRemovable={isChannelRemovable(channel)}
                  isRenamable={isChannelRenamable(channel)}
                  isActive={channel.id === currentChannelId}
                  onSelect={() => handleChannelSelect(channel.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Правая панель - Сообщения */}
        <div className="col p-0 d-flex flex-column h-100">
          {/* Заголовок канала */}
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b># {currentChannel?.name || 'Канал не выбран'}</b>
            </p>
            <span className="text-muted">
              {currentMessages.length} сообщений
            </span>
          </div>

          {/* Область сообщений */}
          <div className="chat-messages overflow-auto px-5 mb-3">
            {currentMessages.length === 0 ? (
              <div style={{color: '#999', textAlign: 'center', padding: '20px'}}>
                Сообщений пока нет. Напишите первое!
              </div>
            ) : (
              currentMessages.map((msg) => (
                <div key={msg.id} className="text-break mb-2">
                  <b>{msg.username}</b>: {msg.body}
                </div>
              ))
            )}
          </div>

          {/* Форма отправки сообщения */}
          <div className="mt-auto px-5 py-3">
            <form onSubmit={handleSend} className="py-1 border rounded-2">
              <div className="input-group has-validation">
                <input
                  name="body"
                  aria-label="Новое сообщение"
                  placeholder="Введите сообщение..."
                  className="border-0 p-0 ps-2 form-control"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={sending}
                  autoComplete="off"
                />
                <button 
                  type="submit" 
                  className="btn btn-group-vertical"
                  disabled={!newMessage.trim() || !currentChannelId || sending}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2ZM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"/>
                  </svg>
                  <span className="visually-hidden">Отправить</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Модальные окна */}
      <AddChannelModal 
        show={showAddModal} 
        onHide={handleHideAddModal} 
      />
      <RenameChannelModal 
        show={showRenameModal} 
        onHide={handleHideRenameModal}
        channel={selectedChannel}
      />
      <RemoveChannelModal 
        show={showRemoveModal} 
        onHide={handleHideRemoveModal}
        channel={selectedChannel}
      />
    </div>
  );
};

export default ChatPage;
