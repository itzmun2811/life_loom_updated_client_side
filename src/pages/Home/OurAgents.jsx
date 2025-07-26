import React, { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxios from '../../hooks/useAxios';

const OurAgents = () => {
  const axiosInstance = useAxios();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await axiosInstance.get('/agentsThree');
      return res.data;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2
        className="text-4xl font-extrabold text-center mb-14 text-sky-800"
        data-aos="fade-down"
      >
        🤝 Meet Our Expert Agents
      </h2>

      {isLoading ? (
        <div className="text-center text-lg text-gray-600">Loading agents...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {agents.map((agent, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300"
            >
              <div className="flex justify-center mt-6">
                <img
                  src={agent.photoURL}
                  alt={agent.name}
                  className="w-48 h-48 rounded-full border-4 border-sky-600 object-cover shadow-lg"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{agent.name}</h3>
                <p className="text-gray-600 text-sm mb-2">📧 {agent.email}</p>
                <p className="text-gray-600 text-sm">🎓 Experience: {agent.experience} years</p>
                <p className="text-gray-600 text-sm mb-4">💼 Specialties: {agent.specialties}</p>

                <button className="bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white py-2 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg">
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
