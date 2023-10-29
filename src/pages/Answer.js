import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';


const gettingAnswer = () =>{
  const storedAnswer = JSON.parse(localStorage.getItem('answer'));
    if (storedAnswer) {
      return(storedAnswer);
    }
    else return null
}

const Answer = () => {
  const [isModal, setIsModal] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState('');
  const [answer, setAnswer] = useState(gettingAnswer);
  
  const {id} = useParams();
  

  
  const displayAnswer = answer.find(product => product.product_id === parseInt(id));

  const { imageList} = displayAnswer;
  const modalImage = (id) =>{
    const modalimg = imageList.find(img => img.image_id=== id);
    setModalImgUrl(modalimg.url)
    setIsModal(true);
  }
  const closeModal = () =>{
    setIsModal(false);
  }

  return (
    <div className='w-[90%] ms-auto flex  relative'>
      <div className="bg-blue-50 w-[65%] py-10 flex flex-col gap-10 justify-center items-center">
        {
          imageList.map((image)=>{
            return(
              <div className="w-[90%] h-[90%] overflow-hidden rounded-md cursor-pointer" key={image.image_id}>
                <img src={image.url} onClick={()=>modalImage(image.image_id)} alt="" className='object-cover w-[100%] h-[100%] hover:w-[105%] hover:h-[105%] duration-200'/>
        `     </div>
            )
          })
        }

      </div>
      <div className=" w-[35%] h-screen sticky top-0 right-0 flex justify-center items-center">
        <form action="" className='flex justify-center items-start flex-col outline-none gap-6'>
          <input type="text"  className='w-full outline-none border border-black p-2 rounded-sm'/>
          <input type="text" className='w-full outline-none border border-black p-2 rounded-sm' />
          <textarea name="" id="" cols="30" rows="10" className='w-full outline-none border border-black p-2 rounded-sm'></textarea>
          <button className='bg-blue-500 text-white rounded-md shadow-md py-2 px-6'>Submit</button>
        </form>
      </div>
      <div className={`${isModal? 'flex items-center justify-center bg-opacity-80 fixed w-[100%] opacity-100 h-screen  bg-black top-0 left-0 right-0 bottom-0 z-40 duration-300' : 'w-0 h-0 opacity-0 duration-300'} `}>
        <div className="w-[75%] h-[80%] border-white border-8 relative">
          <span className='text-white w-[40px] h-[40px] font-bold text-[20px] bg-black absolute -top-[20px] -right-[20px] text-center cursor-pointer rounded-full' onClick={closeModal}>x</span>
          <img src={modalImgUrl} className='h-[100%] w-[100%] object-cover' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Answer