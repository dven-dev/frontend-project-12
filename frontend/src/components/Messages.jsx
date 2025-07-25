import React from 'react';

const Messages = ({ messages = [] }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ flexGrow: 1 }}>
    {messages.map(({ id, username, body }) => (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>: {body}
      </div>
    ))}
  </div>
);

export default Messages;
