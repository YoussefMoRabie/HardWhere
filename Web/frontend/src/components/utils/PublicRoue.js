import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const PublicRoutes = (props) => {
  let { state } = useLocation();
  
  return (
    state == null || state.auth !== 'employee' && state.auth !== 'manager' ? <Outlet /> : <Navigate to="/adminpanel" state={state} />
  )
}

export default PublicRoutes