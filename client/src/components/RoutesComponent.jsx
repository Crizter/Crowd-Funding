import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './authComponent/Register.jsx';
import Login from './authComponent/Login.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Navbar from './NavbarComponent/Navbar.jsx';
import Layout from './Layout.jsx';
import Home from './Home/Home.jsx';
import SinglePage from './Pages/SinglePage.jsx';
import UserProfile from './UserProfile/UserProfile.jsx';
import EditProfile from './UserProfile/EditProfile.jsx';
import Category from './Projects/Category.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import Chat from './Chat/Chat.jsx';


function RoutesComponent() {
  return (
    
    <Router>
      <Layout>
          <Routes>
        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />  
             
        

        {/* * Protected Routes */}  
        <Route path="/login/dashboard/user-dashboard/:userId/*" element={<ProtectedRoutes element={Dashboard} />} /> 
        <Route path= "/login/home/:userId/*" element = {<ProtectedRoutes element={ Home}/>} />
        <Route path= "/login/view-project/*" element = {<ProtectedRoutes element = {SinglePage} /> } />
        <Route path = "/login/user-profile/:userId/*" element = {<ProtectedRoutes element={UserProfile} /> } />
        <Route path = "/login/edit-profile/:userId/*" element = {<ProtectedRoutes element={EditProfile} /> } />
        <Route path = "/login/category-project/:userId/*" element = {<ProtectedRoutes element={Category}/>} /> // Create project page 
        <Route path = "/about-us/:userId" element = {<ProtectedRoutes element = {AboutUs} />}/>
        <Route path = "/chat/:userId" element = {<ProtectedRoutes element = {Chat} />}/>

      </Routes>
  </Layout>
    </Router>

  );
}

export default RoutesComponent;