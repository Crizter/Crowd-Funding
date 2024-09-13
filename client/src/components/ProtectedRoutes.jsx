import React from 'react'
import {  Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie' ; 
const ProtectedRoutes = ({element : Element, ...rest}) =>{

  const authToken = localStorage.getItem("token")  // get jwt toekn 
  // Function to check if the user has JWT token
  const hasJwt = () => { 
    return authToken !== null ; // check if the token exists. 
  }

  if(!hasJwt()) { 
    return <Navigate to ="/login" /> ; 

  }
    console.log(authToken);
    
    console.log(hasJwt());
    
    return <Element {...rest} /> ; 

  }
export default ProtectedRoutes ; 