import React from 'react';
import { FaBolt, FaHeadset, FaLaptop, FaLock, FaMapMarkerAlt, FaChartBar } from 'react-icons/fa';
const benefits = [
    {
        title: "Instant Quote Calculation",
        description: "Get real-time insurance quotes by filling a short online form tailored to your needs.",
        icon: <FaBolt className="text-blue-600 text-4xl" />
    },
    {
        title: "Expert Agent Support",
        description: "Talk to licensed insurance agents who guide you in selecting the most suitable policy.",
      icon: <FaHeadset className="text-blue-600 text-4xl" />
    },
    {
        title: "100% Online Application",
        description: "No more paperwork—complete your application securely from anywhere, anytime.",
         icon: <FaLaptop className="text-blue-600 text-4xl" />
    },
    {
        title: "Secure Online Payments",
        description: "We ensure safe and encrypted transactions for all your premium payments.",
         icon: <FaLock className="text-blue-600 text-4xl" />
    },
    {
        title: "Real-Time Claim Tracking",
        description: "Track your insurance claims live with updates right on your dashboard.",
        icon: <FaMapMarkerAlt className="text-blue-600 text-4xl" />
    },
    {
        title: "Personalized Dashboard",
        description: "Manage your policies, documents, payments, and renewals all in one secure place.",
        icon: <FaChartBar className="text-blue-600 text-4xl" />
    }
];

const Benefits = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-blue-900 dark:text-white mb-4">Why Choose <span className="text-blue-600">Life_Loom?</span></h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-12 max-w-xl mx-auto">
                    Discover the key advantages of managing your life insurance digitally with us.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={`${index * 100}`}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
                        >
                            <div className="text-5xl mb-4 text-blue-500 text-center">{benefit.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
