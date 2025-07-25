import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {token && (
          <button type="button" className="btn btn-primary" onClick={handleLogout}>
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
