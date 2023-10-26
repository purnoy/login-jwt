import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';


const PrivateRoute = ({children}) => {
  const userObjString = Cookies.get('user');
  if(!userObjString) <Navigate to="/login" replace/>
  try{
    const userObj= JSON.parse(userObjString);
    if(userObj && (userObj.role==='user' || userObj.role==='admin')){
      return children
    }
    else{
      <Navigate to ="/error" replace/>
    }
  }catch(error){
    console.error('Error parsing user object:', error);
    return <Navigate to="/error" replace />;
  }
}

export default PrivateRoute


