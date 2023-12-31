import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, Route, createBrowserRouter, useNavigate } from 'react-router-dom'
import Answer from './Answer'
import {AiFillCaretDown} from 'react-icons/ai'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'



const answerid = [
  { id:1, title:'hello' }, { id:2, title:'bello' }, { id:3, title:'helo' }, { id:4, title:'hell999o' }, { id:5, title:'he7jj' }
]

const Dashboard = () => {
  const {loginSuccess} = useContext(AuthContext);

 
    if(loginSuccess){
      axios.get('http://localhost:3001/api/products')
      .then(response => {
        const data = response.data;
        console.log(data);
        
        localStorage.setItem('answer', JSON.stringify(data));
      })
      .catch(error => console.error('Error:', error));
    }

  return (
    <>
      <div className="h-screen w-[80%] mx-auto">
        {answerid.map((item) => (
          <div className=' flex flex-col' key={item.id}>
            <Link className={`bg-yellow-200 m-4 p-4 rounded-lg text-[30px] hover:shadow-lg flex justify-between items-center group`} to={`answer/${item.id}`}>
              <span>{item.id}</span>
              <span className='group'><AiFillCaretDown/></span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard