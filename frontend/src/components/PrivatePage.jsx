import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivatePage = () => {
  const token = localStorage.getItem('userToken');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivatePage;
