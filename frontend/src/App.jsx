import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './locales/i18n.js'
import { loginSuccess, logout } from './slices/authSlice.js'
import AuthContext from './contexts/AuthContext.jsx'
import PrivatePage from './components/PrivatePage.jsx'
import LoginPage from './components/LoginPage.jsx'
import SignupPage from './components/SignupPage.jsx'
import ChatPage from './components/ChatPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import Header from './components/Header.jsx'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    if (token && username) {
      dispatch(loginSuccess({ token, username }))
    }
  }, [dispatch])

  const logOut = () => {
    dispatch(logout())
  }

  const auth = {
    user,
    logOut,
  }

  return (
    <AuthContext.Provider value={auth}>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<PrivatePage />}>
            <Route path="/" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthContext.Provider>
  )
}

export default App
