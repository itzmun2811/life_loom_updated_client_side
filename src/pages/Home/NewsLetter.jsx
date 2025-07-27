import React from 'react';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const Newsletter = () => {
  const axiosInstance = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const userNameEmail = { name, email };

    try {
      const res = await axiosInstance.post('/subscribers', userNameEmail);
      console.log(res);
      Swal.fire({
        title: 'Subscribed!',
        text: 'Thanks for subscribing to our newsletter.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });

      form.reset();
    } catch (error) {
      console.error('Error saving to DB', error);

      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div
      data-aos="zoom-in-right"
      className="w-11/12 my-12 mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Subscribe to Our Newsletter</h2>

      <form
        data-aos="fade-right"
        onSubmit={handleSubmit}
        className="space-y-4 shadow-2xl rounded-2xl"
      >
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
          className="mx-auto w-3/4 p-7 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
