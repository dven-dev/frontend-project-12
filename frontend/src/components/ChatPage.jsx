import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchChannels, setCurrentChannelId, addChannel, updateChannel, removeChannel } from '../slices/channelsSlice.js';
import { fetchMessages, addMessage, sendMessage } from '../slices/messagesSlice.js';
import { getSocket } from '../services/socket.js';
import { cleanText, containsProfanity } from '../services/profanityFilter.js';
import AddChannelModal from './modals/AddChannelModal.jsx';
import RenameChannelModal from './modals/RenameChannelModal.jsx';
import RemoveChannelModal from './modals/RemoveChannelModal.jsx';
import ChannelDropdown from './ChannelDropdown.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId, loading: channelsLoading } = useSelector((state) => state.channels);
  const { messages, loading: messagesLoading, sending } = useSelector((state) => state.messages);
  const { username } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState('');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    const socket = getSocket();
    
    if (!socket) {
      console.warn('Socket not available - user not authenticated');
      return;
    }

    const handleConnect = () => {
      console.log('Socket подключен');
    };

    const handleDisconnect = () => {
      console.log('Socket отключен');
    };

    const handleConnectError = (error) => {
      console.log('Ошибка подключения:', error);
    };

    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel));
    };

    const handleRenameChannel = (channel) => {
      dispatch(updateChannel(channel));
    };

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannel(payload));
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('removeChannel', handleRemoveChannel);

    return () => {
      if (socket) {
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
        socket.off('connect_error', handleConnectError);
        socket.off('newMessage', handleNewMessage);
        socket.off('newChannel', handleNewChannel);
        socket.off('renameChannel', handleRenameChannel);
        socket.off('removeChannel', handleRemoveChannel);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      return;
    }

    if (!currentChannelId) {
      return;
    }

    // Проверка на нецензурные слова
    if (containsProfanity(newMessage.trim())) {
      toast.error(t('messageContainsProfanity') || 'Сообщение содержит недопустимые слова');
      return;
    }

    // Очистка текста (дополнительная мера)
    const cleanedMessage = cleanText(newMessage.trim());

    const messageData = {
      body: cleanedMessage,
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

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannelId(channelId));
  };

  const currentMessages = messages.filter((msg) => 
    String(msg.channelId) === String(currentChannelId)
  );

  const currentChannel = channels.find(ch => ch.id === currentChannelId);

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

  const isChannelRemovable = (channel) => {
    const defaultChannels = ['general', 'random'];
    return !defaultChannels.includes(channel.name) && channel.removable !== false;
  };

  const isChannelRenamable = (channel) => {
    const defaultChannels = ['general', 'random'];
    return !defaultChannels.includes(channel.name);
  };

  if (channelsLoading || messagesLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4 h-100 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light h-100 d-flex flex-column">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('channels')}</b>
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

        <div className="col p-0 d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b># {currentChannel?.name || 'general'}</b>
            </p>
            <span className="text-muted">
              {t('messagesCount', { count: currentMessages.length })}
            </span>
          </div>

          {/* Убрали сообщение "Напишите первым!" - просто показываем сообщения */}
          <div className="chat-messages overflow-auto px-5 mb-3">
            {currentMessages.map((msg) => (
              <div key={msg.id} className="text-break mb-2">
                <b>{msg.username}</b>: {msg.body}
              </div>
            ))}
          </div>

          <div className="mt-auto px-5 py-3">
            <form onSubmit={handleSend} className="py-1 border rounded-2">
              <div className="input-group has-validation">
                <input
                  name="body"
                  aria-label={t('enterMessage')}
                  placeholder={t('enterMessage')}
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
                  <span className="visually-hidden">{t('sendMessage')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
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
