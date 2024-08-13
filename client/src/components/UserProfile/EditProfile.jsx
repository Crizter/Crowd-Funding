import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



function EditProfile() {

  const [username, setUsername] = useState("") ;
  const [email, setEmail] = useState("")  ; 
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const { userId } = useParams();

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
      } catch (error) {
        console.error("Error posting user data:", error.message);
      }
    }
  return (
    <>
    <div>EditProfile</div>
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label>
        Provide the username to change.
      </label>
      <input 
        type ="text"
        value = {username}
        name = "username"
        onChange={(e) => setUsername(e.target.value)} />

<label>
        Provide the email to change.
      </label>
      <input 
        type ="email"
        value = {email}
        name = "email-address"
        onChange={(e) => setEmail(e.target.value)} />
        
        <button type ="submit">
          Submit
        </button>
    </form>
    </>

    
  )
}

export default EditProfile