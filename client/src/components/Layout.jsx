import react from "react";
import Navbar from "./NavbarComponent/Navbar.jsx";

 const Layout = ({children }) => {
 return (
    <>
    <Navbar />
    <main>{children}</main>
    

  </>
  
 )
};

export default Layout