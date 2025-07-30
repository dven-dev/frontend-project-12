// components/ChannelDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';

const ChannelDropdown = ({ channel, onRename, onRemove, isRemovable = true, isRenamable = true, isActive = false, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleRename = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRename(channel);
    setIsOpen(false);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(channel);
    setIsOpen(false);
  };

  return (
    <div role="group" className={`d-flex dropdown btn-group ${isOpen ? 'show' : ''}`} ref={dropdownRef}>
      <button
        type="button"
        className={`w-100 rounded-0 text-start text-truncate btn ${
          isActive ? 'bg-secondary text-white' : 'text-dark'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <span className="me-1">#</span>
        {channel.name}
      </button>
      
      {/* Показываем кнопку выпадающего меню только если есть доступные действия */}
      {(isRemovable || isRenamable) && (
        <button
          type="button"
          className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${isOpen ? 'show' : ''}`}
          onClick={handleToggle}
          aria-expanded={isOpen}
        >
          <span className="visually-hidden">Управление каналом</span>
        </button>
      )}
      
      {isOpen && (isRemovable || isRenamable) && (
        <div 
          className="dropdown-menu show position-absolute"
          style={{
            position: 'absolute',
            inset: '0px 0px auto auto',
            transform: 'translate(0px, 40px)'
          }}
        >
          {isRemovable && (
            <a
              className="dropdown-item"
              role="button"
              tabIndex="0"
              href="#"
              onClick={handleRemove}
            >
              Удалить
            </a>
          )}
          {isRenamable && (
            <a
              className="dropdown-item"
              role="button"
              tabIndex="0"
              href="#"
              onClick={handleRename}
            >
              Переименовать
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ChannelDropdown;
