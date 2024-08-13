import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
    "Other",
    "Sports",
    "Travel",
    "Ukraine Relief",
    "Volunteer",
    "Wishes",
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

  const handleChange = (e) => {
    setSelectCountry(e.target.value);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleClick = async () => {
    try {
      await axios.post(`${BACKEND_URL}/projects/create`, {
        title: title,
        description: description,
        funding_goal: amount,
        category: selectedOption,
        deadline: deadline,
        country : selectCountry
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { userId }
      });
    } catch (error) {
      console.error("Error creating project:", error.message);
    }
  };

  useEffect(() => {
    // Check if all required fields are filled
    if (
      selectCountry &&
      selectedOption &&
      amount &&
      title &&
      description &&
      deadline
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectCountry, selectedOption, amount, title, description, deadline]);

  return (
    <>
      <div>Category</div>
      <div>
        <p>Where will the funds go?</p>
        <p>Choose the location where you plan to withdraw funds.</p>
        <div>
          <label htmlFor='country'>
            Select your country.
          </label>
          <select
            id="country"
            value={selectCountry}
            onChange={handleChange}
          >
            <option value="">Choose a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        {/* Display Category */}
        <div>
          <h1>What best describes why you're fundraising?</h1>
          <div>
            {options.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedOption === option
                    ? "bg-green-100 border-green-400"
                    : "bg-white border-gray-300"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {/* Provide details of project */}
        <form className='flex flex-col'>
          <label>Set your starting goal</label>
          <p>You can always change your target as you go.</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="amount"
            required />
          <label>Provide the title for your fundme.</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            required />
          <label>Provide the description for your fundme.</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            required />
        </form>
        {/* Embed calendar for deadline */}
        <div>
          <p>The deadline for the project is </p>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a deadline"
            required
          />
        </div>
        <button
          onClick={handleClick}
          disabled={isButtonDisabled}
          className={`text-white ${
            isButtonDisabled
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800'
            } focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
          Continue
        </button>
      </div>
    </>
  );
}

export default Category;
