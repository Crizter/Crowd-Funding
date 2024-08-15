import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import Carousel from "../Pages/Carousel.jsx";

function Home() {
  const { userId } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);
  const [progress, setPrgress] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  
  const [projectsToShow, setProjectsToShow] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  const options = [
    "Animals",
    "Business",
    "Community",
    "Competitions",
    "Creative",
    "Education",
    "Emergencies",
    "Environment",
    "Events",
    "Faith",
    "Family",
    "Funerals & Memorials",
    "Medical",
    "Monthly Bills",
    "Newlyweds",
    "Sports",
    "Travel",
    "Ukraine Relief",
    "Volunteer",
    "Wishes",
    "Art",
    "Other",
    "Show All",
  ];

  // FETCH ALL PROJECTS FROM SERVER
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

    console.log("shite value", data);

    fetchData();
  }, [userId]);

  // ANIMATION
  useEffect(() => {
    // Trigger the visibility after a delay when the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Adjust the delay as needed

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  // FETCH FILTER PROJECTS FROM SERVER BASSED ON DROP DOWN SELECTION
  const filterChange = async (selectOption) => {
    try {
      console.log("selectedOption", selectOption);
      const response = await axios.get(`${BACKEND_URL}/projects/filter`, {
        params: { selectOption },
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response?.status);
      throw error;
    }
  };

  // Handle Load More button click
  const handleLoadMore = () => {
    setProjectsToShow((prev) => prev + 3); // Load 3 more projects
  };

  return (
    <>
      <div
        className={` bg-white   h-screen flex flex-col items-center transform transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Heading  */}
        <div className="text-6xl p-4 flex flex-col items-center">
          Welcome to the home.
          <p className="text-xl ">Support causes that matter most to you.</p>
        </div>

        {/* DISPLAY CAROUSEL  */}

        <Carousel />

        {/* FILTER AND SHOW ALL */}
        
        <div className="flex flex-row  px-3  ">
          <button
            onClick={() => {
              setSelectOption("Show All");
              filterChange("Show All");
            }}
            className="m-3  p-3  bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
          >
            Show all
          </button>

          <div className="p-3">
            <select
              id="options"
              value={selectOption}
              onChange={(e) => {
                setSelectOption(e.target.value);
                filterChange(e.target.value);
              }}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
            >
              <option value="" disabled>
                Select category
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>


      
        {/* DISPLAY ALL THE PROJECTS  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {data.slice(0,projectsToShow).map((e) => (
            <div
              key={e.id}
               className="max-w-sm p-6 bg-white hover:bg-blue-gray-200 transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-105 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
              <div className="flex flex-row  justify-around">
                <Link
                  to={`/login/view-project?project_id=${e.id}`}
                  className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                </Link>
                <Link
                  to=""
                  className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Donate now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {projectsToShow < data.length && (
                <button
                  onClick={handleLoadMore}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
                >
                  Load More
                </button>
              )}
        {/* Add About Section */}
        <div
          id="about"
          className="flex flex-col items-center p-4 py-3 mt-16 border w-9/12 "
        >
          <h1 className="text-4xl mb-4">Our Aim</h1>
          <p className="text-lg ">
            Our goal is to create a vibrant and empowering platform that bridges
            the gap between innovative ideas and the support they need to
            thrive. We aim to provide a space where creators can bring their
            dreams to life, and backers can find and support projects that
            resonate with their passions. By fostering a community of
            collaboration and inspiration, we strive to make funding accessible,
            transparent, and impactful for everyone involved. Together, we
            believe we can turn ambitions into reality and make a lasting
            difference in the world.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
