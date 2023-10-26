import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRouteDashboard = ({ children }) => {
  const userObjString = Cookies.get('user');
  
  if (!userObjString) {
    return <Navigate to="/login" replace />;
  }

  try {
    const userObj = JSON.parse(userObjString);

    if (userObj && userObj.role === 'admin') {
      return children;
    } else {
      return <Navigate to="/error" replace />;
    }
  } catch (error) {
    console.error('Error parsing user object:', error);
    return <Navigate to="/error" replace />;
  }
};

export default PrivateRouteDashboard;
