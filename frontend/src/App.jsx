import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import LoginPage from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import PrivatePage from './components/PrivatePage.jsx';

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivatePage />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
