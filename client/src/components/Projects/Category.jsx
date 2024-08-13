import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

function Category() {
  const countries = [
    "United States",
    "Canada",
    "India",
    "Australia",
    "United Kingdom",
    // Add more countries as needed
  ];

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
  ];

  const [selectCountry, setSelectCountry] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const token = localStorage.getItem("token");
  const { userId } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate() ; 

  const handleChange = (e) => {
    setSelectCountry(e.target.value);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleClick = async () => {
    try {
      await axios.post(`${BACKEND_URL}/projects/create`, {
        title,
        description,
        funding_goal: amount,
        category: selectedOption,
        deadline,
        country: selectCountry
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { userId }
      });
      setTitle("");
      setDescription("");
      setSelectedOption("");
      setSelectCountry("");
      setAmount("");
      setDeadline("");
      navigate(`/login/home//${userId}`)
    } catch (error) {
      console.error("Error creating project:", error.message);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(
      !(selectCountry && selectedOption && amount && title && description && deadline)
    );
  }, [selectCountry, selectedOption, amount, title, description, deadline]);

  return (
    // Add location
    <div className='bg-white'>
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-xl mx-auto mt-8">
      <div className="w-full mb-4">
        <h2 className="text-2xl font-semibold mb-2">Fundraiser Details</h2>
        <p className="text-sm text-gray-600">Please provide the following information to set up your fundraiser.</p>
      </div>
      <div className="w-full mb-6">
        <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
          Where will the funds go?
        </label>
        <select
          id="country"
          value={selectCountry}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select your country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Category Selector  */}
      <div className="w-full mb-6">
        <h3 className="text-lg font-semibold mb-2">Fundraising Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {options.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-full border transition-all text-sm ${
                selectedOption === option
                  ? "bg-green-100 border-green-400"
                  : "bg-white border-gray-300"
              } hover:bg-green-50`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {/* Goal Amount  */}
      </div>
      <div className="w-full mb-6">
        <label className="block text-gray-700 font-medium mb-2">Set your starting goal</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          placeholder="Enter amount"
        />
      </div>
      <div className="w-full mb-6">
        <label className="block text-gray-700 font-medium mb-2">Fundraiser Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          placeholder="Enter title"
        />
      </div>
      <div className="w-full mb-6">
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter description"
          rows="4"
        />
      </div>
      {/* Calender for picking up the date */}
      <div className="w-full mb-6">
        <label className="block text-gray-700 font-medium mb-2">Deadline</label>
        <DatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a deadline"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {/* Submit button */}
      <button
        onClick={handleClick}
        disabled={isButtonDisabled}
        className={`w-full text-white py-2 rounded-lg ${
          isButtonDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-700 hover:bg-blue-800"
        } focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
      >
        Continue
      </button>
      
    </div>
    </div>
    
  );
}

export default Category;
