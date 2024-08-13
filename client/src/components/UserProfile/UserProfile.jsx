import React, { useState, useEffect } from "react";
import { useParams  ,Link} from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";


function UserProfile() {
  const [data, setData] = useState({});
  const { userId } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the visibility after a delay when the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Adjust the delay as needed

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    
    fetchData();
  }, [BACKEND_URL, token, userId]);

  return (
    <div
  className={` bg-gray-800  h-screen flex flex-col items-center transform transition-opacity duration-1000 ease-in-out ${
    isVisible ? "opacity-100" : "opacity-0"
  }`}
>
  <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md mt-10">
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <FaUserCircle className="text-8xl text-gray-400" />
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Profile</h1>
      <div className="w-full space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500 mb-1">Username</p>
          <p className="text-lg font-semibold text-gray-900">{data.name || "N/A"}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 ">
          <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
          <p className="text-lg font-semibold text-gray-900">{data.email || "N/A"}</p>
        </div>
     
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500 mb-1">User ID</p>
          <p className="text-lg font-semibold text-gray-900">{userId || "N/A"}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Add Create project button  */}
  <div className="flex flex-col relative mt-3 ">
    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Create a fund me project.
    </button>
    <Link to={`/login/edit-profile/${userId}`}>
    <button
      type="button"
      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      Edit profile
    </button>
  </Link>
    
    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Change password.
    </button>
  </div>
</div>
  );
}

export default UserProfile;
