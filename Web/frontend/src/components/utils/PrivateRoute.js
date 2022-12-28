import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const PrivateRoutes = (props) => {
  let {state}=useLocation();
  const isok=()=>{
    if (state==null)
    return false;
    else
      return state.auth === 'employee' || state.auth === 'manager'
  }
  return (
     isok()? <Outlet /> : <Navigate to="/signin" />
  )
}

export default PrivateRoutes