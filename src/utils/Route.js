import React from 'react'
import {Outlet, Navigate } from 'react-router-dom';

const LoginRoute = () => {
    return(
        localStorage.getItem('uuid') ? <Navigate to="/admin-panel" /> : <Outlet/>
  );
    }
  
const AdminRoute = ({ element: Element, ...rest }) => {
    return(
        localStorage.getItem('uuid') ? <Outlet/> :  <Navigate to="/login" />
  );  
}
export {LoginRoute , AdminRoute}