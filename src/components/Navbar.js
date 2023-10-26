import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './../Context/AuthContext';
import Account from '../pages/Account';
import Cookies from 'js-cookie';
const Navbar = () => {
  const {setLoginSuccess, loginSuccess} = useContext(AuthContext);

   
  //   let cookieArray = document.cookie.split("; ");
  // const userObj = {}; 
  // for (const cookie of cookieArray) {
  //   const [name, value] = cookie.split("=");
  //   if (name === "user") {
  //     const userProperties = JSON.parse(decodeURIComponent(value));
  //     Object.assign(userObj, userProperties);
  //   }
  // }
  let userObj;
  const newObj = Cookies.get('user')
  if(newObj !==undefined){
    userObj = JSON.parse(newObj);
    console.log(newObj)
  }
  // const newObj = JSON.parse(Cookies.get('user'));
  
  const logout = () =>{
    console.log('hi')
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem("answer");
    setLoginSuccess(false);
    window.location.reload();
  }


  return (
    <div>
      {
        userObj && userObj.role ==='admin'?
        (
          <ul className='bg-yellow-200 flex justify-center items-center gap-6 py-4'>
            <li className='font-bold text-[20px]'><Link to="/">Home</Link></li>
            <li className='font-bold text-[20px]'><Link to="/dashboard">Dashboard</Link></li>
            <li className='font-bold text-[20px]'><Link to={`/account/${userObj.username}`}>Account</Link></li>
            <li className='font-bold text-[20px]' onClick={logout}><Link to = "/login">Logout</Link></li>
          </ul>
        )
        :
        userObj && userObj.role ==='user'?
        (
          <ul className='bg-yellow-200 flex justify-center items-center gap-6 py-4'>
            <li className='font-bold text-[20px]'><Link to="/">Home</Link></li>
            <li className='font-bold text-[20px]'><Link to="/account">User</Link></li>
            <li className='font-bold text-[20px]' onClick={logout}><Link to = "/login">Logout</Link></li>
          </ul>
        ):
        (
          <ul className='bg-yellow-200 flex justify-center items-center gap-6 py-4'>
            <li className='font-bold text-[20px]'><Link to="/">Home</Link></li>
            <li className='font-bold text-[20px]'><Link to = "/login">Login</Link></li>
          </ul>
        )
      }
    </div>
  )
}

export default Navbar
