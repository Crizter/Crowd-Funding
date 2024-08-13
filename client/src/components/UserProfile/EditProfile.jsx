import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";



function EditProfile() {

  const [username, setUsername] = useState("") ;
  const [email, setEmail] = useState("")  ; 
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const { userId } = useParams();
  const navigate   = useNavigate() ; 


    const handleSubmit = async(e) => { 
      
      e.preventDefault() ;
      try {
        await axios.post(`${BACKEND_URL}/users/editData`,{
          name : username, email :  email
        }, {
          headers: {
            Authorization : `Bearer ${token}`
          }, 
          params : {userId}

        })
        setEmail("") ; 
        setUsername("") ;
        navigate(`/login/user-profile/${userId}`)
      } catch (error) {
        console.error("Error posting user data:", error.message);
      }
    }
  return (
    <>
   


<form className="max-w-sm mx-auto" onSubmit={handleSubmit} >
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input
    type ="email"
    value = {email}
    name = "email-address"
    onChange={(e) => setEmail(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com"  />
  </div>
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Change your  username</label>
    <input 
    type ="text"
    value = {username}
    name = "username"
    onChange={(e) => setUsername(e.target.value)} 
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     placeholder="abcdef"
      />
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </>

    
  )
}

export default EditProfile