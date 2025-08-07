import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

const Messages = ({ messages = [] }) => {
  const { t } = useTranslation()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div
      id="messages-box"
      className="overflow-auto px-5 flex-grow-1"
    >
      {messages.length === 0
        ? (
            <div className="text-muted text-center mt-4">
              {t('noMessages')}
            </div>
          )
        : (
            messages.map(({ id, username, body }) => (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>
                :
                {' '}
                <span>{body}</span>
              </div>
            ))
          )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages
