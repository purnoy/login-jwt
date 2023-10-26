import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";


function App() {
  const {loginSuccess} = useContext(AuthContext);
  return (
    <>
    <Navbar/>
      <Outlet/>
    </>
  )
}

export default App;
