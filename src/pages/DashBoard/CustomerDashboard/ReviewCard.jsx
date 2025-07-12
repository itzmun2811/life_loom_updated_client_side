import React, { useState } from 'react';

const ReviewCard = ({handleSubmit,closeModal}) => {
      const [rating, setRating] = useState(0);
      const [message, setMessage] = useState(''); 
      
    
      const handleReview = () => {
        console.log('Rating:', rating);
        console.log('Message:', message);
        // You can send this data to a server here
    handleSubmit();
    closeModal();
      };
       
    return (
        <div>
             <div className="max-w-md mx-auto p-6 rounded-xl shadow bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Your opinion matters!</h2>
      <p className="text-center mb-4">How was your experience?</p>

      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl cursor-pointer ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Write your message..."
        className="w-full p-3 rounded border border-gray-300 mb-4"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleReview}
        className="w-full py-2 rounded bg-violet-600 text-white font-semibold"
      >
        Submit Feedback
      </button>

      <p className="text-center mt-4 text-sm text-gray-500">
        <a href="#">Maybe later</a>
      </p>
    </div>
        </div>
    );
};

export default ReviewCard;