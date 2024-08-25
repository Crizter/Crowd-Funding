import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';

function AllTransactions({ userId }) {
  const [data, setData] = useState([]); 
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => { 
    const fetchData = async () => { 
      console.log(userId);

      try {
        const response = await axios.get(`${BACKEND_URL}/transactions/all-payments`, {
          params: { userId }
        });
        console.log('the project is ', userId);
        console.log('API Response:', response.data);
        console.log('Type of data:', Array.isArray(response.data) ? 'Array' : typeof response.data);
        setData(response.data); 
      } catch (error) {
        console.log(error);
        console.log(error.response?.status);
        throw error; 
      }
    } 
    fetchData(); 
  }, [BACKEND_URL, userId]);

  return (
    <div className="relative mx-400 flex flex-col items-center overflow-x-auto shadow-md sm:rounded-lg">
      <div className='text-lg'>Previous Donations</div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((e, index) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {e.user_id}
                </th>
                <td className="px-6 py-4">
                  {e.transaction_amount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                No transactions available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllTransactions;
