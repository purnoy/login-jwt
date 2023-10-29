import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

export const AuthContext = createContext();
// const gettingAnswer = () =>{
//   const storedAnswer = JSON.parse(localStorage.getItem('answer'));
//     if (storedAnswer) {
//       return(storedAnswer);
//     }
//     else return null
// }

const AuthProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  // const [answer, setAnswer] = useState(gettingAnswer);

  // useEffect(() => {
  //   if(loginSuccess){
  //     axios.get('http://localhost:3001/api/products')
  //     .then(response => {
  //       const data = response.data;
  //       console.log(data);
  //       setAnswer(data);
  //       localStorage.setItem('answer', JSON.stringify(data));
  //     })
  //     .catch(error => console.error('Error:', error));
  //   }
  // }, [loginSuccess]); 


  return (
    <AuthContext.Provider value={{ loginSuccess, setLoginSuccess}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
