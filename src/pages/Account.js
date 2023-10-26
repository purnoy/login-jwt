import React from 'react'
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';


const Account = () => {
  const {userid} = useParams();
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className='bg-yellow-200 p-6 text-[30px]'>
          Hello {userid} This is the Account Page
        </div>
      </div>
    </>
  )
}

export default Account
