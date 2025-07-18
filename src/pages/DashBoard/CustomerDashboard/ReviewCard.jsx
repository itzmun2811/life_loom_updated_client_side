import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ReviewCard = ({ handleSubmit, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReview = () => {
    if (rating === 0 || message.trim() === '') {
      setError('Please provide both a star rating and feedback.');
      return;
    }

    handleSubmit({ rating, message });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
    
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          aria-label="Close"
        >
          <AiOutlineClose />
        </button>

  
        <h2 className="text-2xl font-bold text-center mb-1">⭐ Submit Review</h2>
        <p className="text-center text-gray-500 mb-5">Write a review for the purchased policy</p>

  
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= rating ? (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                className="text-yellow-400 text-2xl cursor-pointer"
              />
            ) : (
              <FaRegStar
                key={star}
                onClick={() => setRating(star)}
                className="text-gray-300 text-2xl cursor-pointer"
              />
            )
          )}
        </div>


        <textarea
          placeholder="Write your feedback..."
          className="w-full p-3 rounded border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

  
        <button
          onClick={handleReview}
          className="w-full py-2 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
        >
          Submit Feedback
        </button>

    
        <p
          onClick={closeModal}
          className="text-center mt-4 text-sm text-gray-500 hover:underline cursor-pointer"
        >
          Maybe later
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
