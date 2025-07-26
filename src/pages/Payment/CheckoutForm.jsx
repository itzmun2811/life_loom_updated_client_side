import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = () => {
  const { id: policyId } = useParams();
  const axiosSecure=useAxiosSecure();
  const location = useLocation();
  const frequency = new URLSearchParams(location.search).get('frequency') || 'annually';
 const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const [clientSecret, setClientSecret] = useState('');

  const { data: policy, isLoading } = useQuery({
    queryKey: ['policy', policyId],
    enabled: !!policyId,
    queryFn: async () => {
      const res = await axiosSecure(`/policy/${policyId}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const createIntent = async () => {
      if (policy) {
        const amount =
          frequency === 'monthly'
            ? parseInt(policy.monthlyPremium)
            : parseInt(policy.annualPremium);

        try {
          const res = await axiosSecure.post('/create-payment-intent',

             
       {amount:amount})
          ;
          setClientSecret(res.data.clientSecret);
        } catch (err) {
          Swal.fire('Error', 'Failed to create payment intent', 'error',err.message);
        }
      }
    };

    createIntent();
  }, [policy, frequency,axiosSecure]);

  const updatePaymentStatus = useMutation({
    mutationFn: async ({ id, transactionId, frequency }) => {
      return await axiosSecure.patch(`/policy-paid/${id}`, {
        transactionId,
        frequency,
      });
    },
    onSuccess: () => {

      Swal.fire('✅ Success', 'Payment successful and policy activated.', 'success');
    },
    onError: () => {
      Swal.fire('❌ Error', 'Failed to update payment status.', 'error');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {
          name: policy?.applicantName || 'Customer',
          email: policy?.email,
        },
      });

      if (error) {
        Swal.fire('Error', error.message, 'error');
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        Swal.fire('❌ Error', result.error.message, 'error');
      } else if (result.paymentIntent.status === 'succeeded') {
        updatePaymentStatus.mutate({
          id: policyId,
          transactionId: result.paymentIntent.id,
          frequency,
        });
      }
    } catch (err) {
      Swal.fire('Error', err.message || 'Something went wrong', 'error');
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading policy...</p>;

  const selectedAmount =
    frequency === 'monthly'
      ? policy?.monthlyPremium
      : policy?.annualPremium;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 my-12"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Secure Payment
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Policy Name
          </label>
          <input
            type="text"
            value={policy?.name || ''}
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Premium Amount (৳)
          </label>
          <input
            type="text"
            value={selectedAmount}
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
          <p className="text-sm text-gray-500 mt-1 capitalize">
            Frequency: {frequency}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                  invalid: { color: '#9e2146' },
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || updatePaymentStatus.isLoading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {updatePaymentStatus.isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
