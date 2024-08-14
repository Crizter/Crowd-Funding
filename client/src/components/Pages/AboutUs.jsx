import React, { useState, useEffect } from 'react';

function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-white h-screen flex flex-col items-center justify-center p-8 transform transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1 className="text-4xl font-bold mb-6 text-blue-700">About Us</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-6">
        Welcome to our crowdfunding platform, where ideas come to life and dreams are realized. Our mission is to connect passionate creators with people who believe in their vision. We are committed to providing a seamless and transparent platform for fundraising, helping innovators turn their ideas into reality.
      </p>
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-6">
        Whether you're a backer looking to support the next big thing or a creator ready to launch your project, we are here to help every step of the way. Join us in making the world a better place, one project at a time.
      </p>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        Thank you for being a part of our journey. Together, we can make a difference.
      </p>
    </div>
  );
}

export default AboutUs;
