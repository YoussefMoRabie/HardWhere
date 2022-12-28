import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const PrivateRoutes = (props) => {
  let {state}=useLocation();
  console.log(state.auth)
  return (
    state.auth === 'employee' || state.auth ==='manager' ? <Outlet /> : <Navigate to="/signin" />
  )
}

export default PrivateRoutes