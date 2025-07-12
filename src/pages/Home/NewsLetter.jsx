import React, { useState } from 'react';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';

const Newsletter = () => {
 const axiosInstance =useAxios();


 const handleSubmit = async (e) => {

  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;

  const userNameEmail={
    name,email
  }
  try {
    const res= await axiosInstance.post('/subscribers',userNameEmail)
    console.log(res);
    alert("Thanks for subscribing!");
  } catch (error) {
    console.error("Error saving to DB", error);
  }
};



  return (
    <div data-aos='zoom-in-right' className="w-11/12 my-12 mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Subscribe to Our Newsletter</h2>

       

        <form data-aos='fade-right' onSubmit={handleSubmit} className="space-y-4 shadow-2xl rounded-2xl">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded dark:bg-gray-700"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded dark:bg-gray-700"
          />
          <button
            type="submit"
            className=" mx-auto w-3/4 p-7 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        </form>

    </div>
  );
};

export default Newsletter;
