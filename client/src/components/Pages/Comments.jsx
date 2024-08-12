import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Comments() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);
  const [myInput, setMyInput] = useState(""); // takes comment from the form box.
  const location = useLocation();
  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const projectId = params.get("project_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentResponse = await axios.get(
          `${BACKEND_URL}/comments/view-comment`,
          {
            params: { projectId },
          }
        );
        setData(commentResponse.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response?.status);
        throw error;
      }
    };
    fetchData();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = myInput;
    try {
      console.log(myInput);
      if(!token) { 
         alert('Plese login to comment.')
         return ;
      }
      
      await axios.post(
        `${BACKEND_URL}/comments/add-comment`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { projectId },
        }
      );
      setMyInput("")
    } catch (error) {
      console.log(error.message);
      console.log(error.response?.status);
      throw error;
    }
    try {
      const commentResponse = await axios.get(
        `${BACKEND_URL}/comments/view-comment`,
        {
          params: { projectId },
        }
      );
      setData(commentResponse.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response?.status);
      throw error;
    }
  };

  return (
    <>
      {/* Comment form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Share Your Thoughts</h3>
        <textarea
          value={myInput}
          id="myInput"
          onChange={(e) => setMyInput(e.target.value)}
          placeholder="Enter your thoughts"
          className="w-full h-24 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          Submit Comment
        </button>
      </form>

      {/* Comments list  */}
      {data.length > 0 ? (
        data.map((comment) => (
          <div key={comment.id} className="flex mt-4">
            {/* Image section. Maybe add later */}
            <div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/men/43.jpg"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="font-medium text-purple-800">
                {" "}
                {comment.creator_id}
              </div>
              <div className="text-gray-600">
                {new Date(comment.created_at).toLocaleDateString("en-GB")}
              </div>
              <div className="mt-2 text-purple-800">{comment.comment}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No comments yet. Be the first to comment!
        </p>
      )}

      <p className="ms-auto text-xs text-gray-500 dark:text-gray-400 flex justify-center ">
        Remember, contributions to this topic should follow our{" "}
        <a
          href="https://help.ft.com/faq/commenting-on-articles/what-are-your-commenting-guidelines/"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Community Guidelines
        </a>
        .
      </p>
    </>
  );
}

export default Comments;
