import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comments from './Comments';
import axios from 'axios';
import ProgressBar from '../ProgressBar/ProgressBar';
function SinglePage() {
    const location = useLocation() ;
    const queryParams =  new URLSearchParams(location.search)
    const project_id = queryParams.get('project_id') ; 
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState([]);
    const date = new Date() ; 

    useEffect(() => { 
        const fetchData = async () => { 
            try {
                console.log('project id ' , project_id);
                
                const response = await axios.get(`${BACKEND_URL}/projects/view`,{
                    params : {project_id}
                })
                console.log(response.data);
                setData(response.data) ; 
            } catch (error) {
                throw error ;
            }
           
        } ; fetchData() ;
    }, [project_id])

   
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <>
        <div className="flex justify-center items-center p-4 bg-green-100">
            <div className="max-w-3xl w-96 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <img
                    className="rounded-t-lg w-40 mx-8 object-cover"
                    src="/src/assets/profile.png"
                    alt=""
                />
                <div className="p-8">
                    <h5 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.title}
                    </h5>
                    <p className="mb-4 text-lg font-normal text-gray-700 dark:text-gray-400">
                        {data.description}
                    </p>
                    <div className="mb-4">
                        <p className="text-lg font-bold text-gray-700 dark:text-gray-400">
                            Amount Raised: ${data.amount_raised}
                        </p>
                        <p className="text-lg font-bold text-gray-700 dark:text-gray-400">
                            Funding Goal: ${data.funding_goal}
                        </p>
                        <ProgressBar amountRaised={data.amount_raised} totalAmount={data.funding_goal} />
                        <p className="text-lg font-bold text-gray-700 dark:text-gray-400">
                            Deadline: {data.deadline ? formatDate(data.deadline) : ''}
                        </p>    
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center px-6 py-3 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Donate now
                        <svg
                            className="w-4 h-4 ml-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div>
            <Comments />

        </div>
        </>
    );
}

export default SinglePage ;