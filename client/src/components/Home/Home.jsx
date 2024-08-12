import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";

function Home() {
  const { userId } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);
  const [progress, setPrgress] = useState() ;
  const navigate = useNavigate();
  const location = useLocation() ; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/projects/viewAll`);
        console.log("the response data is ", response.data);
        console.log("the data is ", data);
        setData(response.data);   
        
      } catch (error) {
        console.log(error.message);
        console.log(error.response?.status);
        throw error;
      }
    };

console.log('shite value', data);

    fetchData();
  }, [userId]);

  // TODO ADDDING SCROLLING ANIMATION

  


  return (
    <>
    
      {/* Heading  */}
      <div className="text-6xl p-4">
        Welcome to the home.
        <p className="text-xl p-3">Support causes that matter most to you.</p>
      </div>

      

      {/* DISPLAY ALL THE PROJECTS  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data.map((e) => (
          <div
            key={e.id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={`/login/view-project/${e.id}`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span>{e.title}</span>
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <span>{e.description}</span>
            </p>

            {/* Amount */}
            <div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span>Funding goal: {e.funding_goal}</span>
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Amount raised:<span> {e.amount_raised}</span>
              </p>

              <p className="mb-3 font-light text-gray-700 dark:text-gray-400">
                <span>
                  User id :<span className="font-extrabold"> {e.id}</span> is
                  organizing the fundraiser
                </span>
              </p>
            </div>

            {/* Category */}
            <div className="relative z-0 mb-3">
              <input
                type="text"
                disabled
                id="floating_standard"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                <span>Category: {e.category}</span>
              </label>
            </div>

            <ProgressBar
              amountRaised={e.amount_raised}
              totalAmount={e.funding_goal}
            />

            <Link
              to={`/login/view-project?project_id=${e.id}`}
              className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
            </Link>
            <button
              onClick={() => {
                console.log(e);
              }}
            >
              test
            </button>
          </div>
        ))}
      </div>

     {/* Add About Section */}
     <div id="about" className="flex flex-col p-4 mt-16">
        <h1 className="text-4xl mb-4">Our Aim</h1>
        <p className="text-lg">
          Our goal is to create a vibrant and empowering platform that bridges
          the gap between innovative ideas and the support they need to thrive.
          We aim to provide a space where creators can bring their dreams to
          life, and backers can find and support projects that resonate with
          their passions. By fostering a community of collaboration and
          inspiration, we strive to make funding accessible, transparent, and
          impactful for everyone involved. Together, we believe we can turn
          ambitions into reality and make a lasting difference in the world.
        </p>
      </div>
    </>
  );
  
}

export default Home;
