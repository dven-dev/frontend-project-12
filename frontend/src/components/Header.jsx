import React from 'react';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div className="container d-flex justify-content-between align-items-center">
      <a className="navbar-brand" href="/">Hexlet Chat</a>
      <button type="button" className="btn btn-primary">Выйти</button>
    </div>
  </nav>
);

export default Header;
