function Channels({ channels, currentChannelId, onSelectChannel }) {
  console.log('Channels render:', channels)
  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map(channel => (
        <li className="nav-item w-100" key={channel.id}>
          <button
            type="button"
            className={`w-100 rounded-0 text-start btn ${
              channel.id === currentChannelId ? 'btn-secondary' : 'btn-outline-secondary'
            }`}
            onClick={() => onSelectChannel(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Channels
