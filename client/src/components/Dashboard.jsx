import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const [suc, setSuc] = useState();
  axios.get('http://127.0.0.1:3001/dashboard')
    .then(res => {
      if (res.data === "Success") {
         setSuc("successfully login ok")
      }
      else {
        navigate('/');
      }
    }).catch(err=>console.log(err))
return (
  <>
    Hello
    <h1>{suc}</h1>
  </>
)
}

export default Dashboard
