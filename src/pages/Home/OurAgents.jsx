import React, { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurAgents = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agents');
      return res.data;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-violet-700" data-aos="fade-down">
        Meet Our Agents
      </h2>

      {isLoading ? (
        <div className="text-center text-lg text-gray-600">Loading agents...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.slice(0,3).map((agent, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden border border-gray-200"
              data-aos="fade-left"
              data-aos-delay={index * 100}
            >
              <img
                src={agent.photoURL}
                alt={agent.name}
                className="w-64 rounded-3xl mx-auto shadow-2xl h-64 object-cover"
              />

              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">{agent.name}</h3>
                <p className="text-sm text-gray-600">📧 {agent.email}</p>
                <p className="text-sm text-gray-600">🎓 Experience: {agent.experience} years</p>
                <p className="text-sm text-gray-600">💼 Specialties: {agent.specialties}</p>

                <button className="mt-4 w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurAgents;
