import { useSelector, useDispatch } from 'react-redux
import { useTranslation } from 'react-i18next'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { t } = useTranslation()
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {token && (
          <button type="button" className="btn btn-primary" onClick={handleLogout}>
            {t('logout')}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Header
