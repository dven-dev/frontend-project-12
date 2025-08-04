import { useTranslation } from 'react-i18next'

const Messages = ({ messages = [] }) => {
  const { t } = useTranslation()
 
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ flexGrow: 1 }}>
      {messages.length === 0 ? 
      (
        <div className="text-muted text-center mt-4">
          {t('noMessages')}
        </div>
      ) 
      : (
        messages.map(({ id, username, body }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            : {body}
          </div>
        ))
      )}
    </div>
  )
}

export default Messages
