import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'

import { useNavigate ,useParams } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext';
import Cookies from 'js-cookie';


const Login = () => {
  const {loginSuccess, setLoginSuccess} = useContext(AuthContext); 
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  
  const userRef = useRef();
  useEffect(() =>{
    userRef.current.focus();
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios
      .post('http://localhost:3001/login', {username, password})
      console.log(response);
      const date = new Date();
      const expireDate = new Date(date.getTime() + 60 * 60 * 1000); 
      // document.cookie = "token=" + response.data.token + "; expires=" + expireDate.toUTCString();
      // document.cookie = `user=${JSON.stringify(response.data.user)};expires= ${expireDate.toUTCString()} path=/`;
      Cookies.set('token', response.data.token, { expires: expireDate });
      Cookies.set('user', JSON.stringify(response.data.user), { expires: expireDate });    
      setLoginSuccess(true);
    }catch(error){
      console.log('Login Error', error)
    }
  }

  const redirectPage = () =>{
    const userObjString = Cookies.get('user');

    const userObj= JSON.parse(userObjString);

    userObj.role === 'admin'? navigate('/dashboard'):navigate(`/account/${username}`)
    // navigate(`/account/${username}`)
  }

  return (
   <>
       <div className='h-screen w-full flex items-center justify-center'>
        <div className="bg-yellow-200 p-6">
          {
            loginSuccess?(
              redirectPage()
            ):
            (
              <div className="">
                <h1 className='text-center font-bold text-[22px] mb-6'>Please Login</h1>
                  <form onSubmit={handleSubmit} className='flex flex-col w-full  justify-center gap-4'>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="username">Username:</label>
                      <input 
                        className='p-2 focus:outline-none rounded-lg'
                        type="text" 
                        ref={userRef}
                        id="username"
                        onChange={(e)=>setUsername(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="password">Password:</label>
                      <input 
                        className='p-2 focus:outline-none rounded-lg'
                        type="password" 
                        id="password"
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                    </div>
                    <button type='submit' className='bg-slate-300 py-2 rounded-lg shadow-lg focus:shadow-md'>Login</button>
                  </form>
              </div>
            )
          }
        </div>
      </div>
   </>
  )
}

export default Login