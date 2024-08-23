import react from 'react' ; 
import axios from 'axios' ;
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import socketIO from 'socket.io-client'


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const socket = socketIO.connect(BACKEND_URL) ; 
function Chat() {

    const [messages, setMessages] = useState([]) ;
    const [input, setInput] = useState("") ;

    useEffect(() => { 
        // LISTENING THE MESSAGES FROM THE SERVER 
        socket.on("message", (data) => { 
            setMessages((prevMessages) => [...prevMessages, data]) ; 
            console.log(messages);
            
        });

         // Cleanup on component unmount
        return () => {
        socket.off("message");
      };
    })

    const sendMessage = () => {
        if (input.trim()) {
          // Emit message to server
          socket.emit("message", input);
          setInput(""); 
        }
      };

      
  return (
    <div>
    <div>
      {    
      messages.map((msg) => (
        <div>{msg.msg}</div>
      ))}
    </div>
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your message"
    />
    <button onClick={sendMessage}>Send</button>
  </div>
  )
}

export default Chat