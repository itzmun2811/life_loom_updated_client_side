// RejectionModal.jsx
import React, { useState } from 'react';

const RejectionModal = ({ onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded shadow-lg max-w-md w-full"
      >
        <h3 className="text-xl font-semibold mb-4">Rejection Feedback</h3>
        <textarea
          required
          rows="4"
          className="w-full p-2 border rounded mb-4"
          placeholder="Provide a reason for rejection..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RejectionModal;
