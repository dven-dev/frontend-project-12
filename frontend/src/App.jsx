import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LoginPage from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ChatPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
