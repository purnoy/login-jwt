import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const LoginPrivateRoute  = ({children}) => {
  const userObj = Cookies.get('token');
  if( !userObj){
    return children
  }
  return <Navigate to="/error"  replace/>
}

export default LoginPrivateRoute
