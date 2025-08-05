import { Dropdown, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChannelDropdown = ({
  channel,
  onRename,
  onRemove,
  isRemovable = true,
  isRenamable = true,
  isActive = false,
  onSelect,
}) => {
  const { t } = useTranslation()

  const handleSelect = (e) => {
    e.preventDefault()
    onSelect()
  }

  const handleRename = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onRename(channel)
  }

  const handleRemove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(channel)
  }

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <button
        type="button"
        className={`w-100 rounded-0 text-start text-truncate btn ${
          isActive ? 'btn-secondary' : 'btn-light'
        }`}
        onClick={handleSelect}
      >
        <span>
          # {channel.name}
        </span>
      </button>
      {(isRenamable || isRemovable) && (
        <Dropdown.Toggle
          split
          className={`flex-grow-0 dropdown-toggle-split btn ${
            isActive ? 'btn-secondary' : 'btn-light'
          }`}
          id={`dropdown-split-${channel.id}`}
          aria-label={t('channelManagement')}
        >
          <span className="visually-hidden">{t('channelManagement')}</span>
        </Dropdown.Toggle>
      )}
      {(isRenamable || isRemovable) && (
        <Dropdown.Menu>
          {isRenamable && (
            <Dropdown.Item onClick={handleRename}>
              {t('renameChannel')}
            </Dropdown.Item>
          )}
          {isRemovable && (
            <Dropdown.Item onClick={handleRemove}>
              {t('removeChannel')}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      )}
    </Dropdown>
  )
}

export default ChannelDropdown
