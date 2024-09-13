
import React, { useEffect, useState } from 'react' ;
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios' ;
import AllTransactions from './AllTransactions.jsx';




function Dashboard() {
    const {userId}  = useParams()  ; 
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState([]) ;
    const [total, setTotal] = useState("") ;
    const [averageDonation , setAverageDonation] = useState("") ; 
    const [projectIds , setProjectIds] = useState([]) ;

    const token = localStorage.getItem("token") ; // retrieve the token 
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300); 

      return () => clearTimeout(timer);
  
    }, []);
  
    useEffect(() => { 
      const fetchData = async () => { 
          try {
              const response = await axios.get(`${BACKEND_URL}/dashboard/user-dashboard`, {
                  headers: {
                      Authorization: `Bearer ${token}` // Include token in headers
                  },
                  params: { userId }
              });
              setData(response.data);
              console.log(response.data);
              
              const projectResponse = await axios.get(`${BACKEND_URL}/projects/viewAll`, {
                  headers: {
                      Authorization: `Bearer ${token}` // Include token in headers
                  },
                  params: { userId }
              });
              
              const projectIds = projectResponse.data.map(project => project.id);
              setProjectIds(projectIds);
              console.log('The project ids are', projectIds);

              const dashboardDataResponse = await axios.get(`${BACKEND_URL}/dashboard/getDashboardData`, {
                  headers: {
                      Authorization: `Bearer ${token}` // Include token in headers
                  },
                  params: { userId } 
              });
              
              setTotal(dashboardDataResponse.data.totalDonation); 
              setAverageDonation(dashboardDataResponse.data.averageDonation);

          } catch (error) {
              console.log(error.message);
              console.log(error.response?.status);
              throw error; 
          }
      };
      fetchData();
  }, [BACKEND_URL, userId, token]);

  return (
    <div
    className={` bg-white   h-screen flex flex-col items-center transform transition-opacity duration-1000 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
  >

   
    <div className="flex flex-col items-center justify-center mt-3 p-4">
      <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Dashboard</h1>

      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mb-5 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Export to PDF
      </button>

      <div className="flex flex-wrap justify-center space-x-4 mt-4 mb-8">
        <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <label className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Total Donation</label>
          <input type="text" value={total} disabled className="w-full text-center bg-gray-100 border border-gray-300 rounded-lg py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <label className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Average Donation</label>
          <input type="text" value={averageDonation} disabled className="w-full text-center bg-gray-100 border border-gray-300 rounded-lg py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </div>

      <div className="w-full">
        {/* {projectIds.map(id => (
          <AllTransactions key={id} projectId={id} />
        ))} */}
        <AllTransactions key = {userId} userId = {userId} />
      </div>
    </div> 
    </div>
  );
}

export default Dashboard