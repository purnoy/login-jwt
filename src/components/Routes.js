import App from "../App";
import Login from './../pages/Login';
import Account from './../pages/Account';
import Dashboard from './../pages/Dashboard';
import { createBrowserRouter} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPrivateRoute from "./LoginPrivateRoute";
import PrivateRouteDashboard from "./PrivateRouteDashboard";
import Error from "./Error";

import Answer from './../pages/Answer';

const router = createBrowserRouter([
  {
    element: <App/>,
    path: '/',
    children: [

      {
        path: '/login',
        element:(
            <LoginPrivateRoute>
                <Login/>
            </LoginPrivateRoute>
        )
        // element: <Login/>
      },
      {
        path: '/account/:userid',
        element:(
            <PrivateRoute>
                <Account/>
            </PrivateRoute>
        ) 
      },
      {
        path: '/dashboard',
        element: (
            <PrivateRouteDashboard>
                <Dashboard/>
            </PrivateRouteDashboard>
        ),
        // children: [
        //   {
        //     element: <Answer/>,
        //     path: '/answer/:id'
        //   }
        // ]
      },
      {
        path: '/dashboard/answer/:id',
        element: (
            <PrivateRouteDashboard>
                
                  <Answer/>
                
            </PrivateRouteDashboard>
        )
      },
      {
        path: '/error',
        element: <Error/>
      }
    ]
  }
])


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//       <Route path='' element={<Home/>}/>
//       <Route element={<PrivateRoute/>}>
//         <Route path='account/:userid' element={<Account/>}/>
//       </Route>
//       <Route element={<PrivateRoute/>}>
//           <Route path='dashboard' element={<Dashboard/>} />
//       </Route>
//       {/* <Route element={<LoginPrivateRoute/>}> */}
//         <Route path='login' element={<Login/>}/>
//       {/* </Route> */}
      
//     </Route>
//   )
//)
export default router;
