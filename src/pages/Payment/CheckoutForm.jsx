import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error('[Payment error]', error.message);
      return;
    }

    const res = await axios.post('http://localhost:3000/create-payment-intent', {
      amount: 80,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: 'Test User',
        },
      },
    });

    if (result.error) {
      console.error('[Confirm error]', result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log('✅ Payment successful:', result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 my-12">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Secure Payment</h2>

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Policy Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Policy Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Payment Amount Field */}
        <div>
          <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Amount (৳)
          </label>
          <input
            type="number"
            id="payment"
            placeholder="Enter amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
          <div className="p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe}
          className="w-full py-2 mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
