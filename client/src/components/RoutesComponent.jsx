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
        
      </Routes>
  </Layout>
    </Router>

  );
}

export default RoutesComponent;