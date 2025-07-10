import React, { useState } from 'react';

const FAQs = () => {
    const faqList = [
        {
            question: "What is the main goal of the Life Insurance Management Platform?",
            answer: "The platform aims to simplify how users purchase, manage, and understand life insurance by offering a transparent, fully digital, and user-friendly experience."
        },
        {
            question: "Who can use the platform?",
            answer: "The platform is designed for three types of users: Customers looking to buy or manage insurance, Agents offering consultation and policy suggestions, and Admins managing platform operations."
        },
        {
            question: "How can users get personalized insurance quotes?",
            answer: "Users can enter basic personal and financial information into the quote engine, which uses algorithms to match them with suitable policies and provide real-time premium estimates."
        },
        {
            question: "Is the application mobile-friendly?",
            answer: "Yes, the platform is fully responsive and works seamlessly across desktops, tablets, and smartphones, offering a consistent experience on all devices."
        },
        {
            question: "What kind of policies can customers explore?",
            answer: "Customers can explore various insurance types such as term life, whole life, universal life, and group insurance plans—all listed with transparent information and comparisons."
        },
        {
            question: "How secure is my information on this platform?",
            answer: "Security is a top priority. The platform uses encrypted communication, secure authentication (JWT + MFA), and regular security audits to protect user data."
        },
        {
            question: "What can agents do on their dashboard?",
            answer: "Agents can manage their leads, schedule appointments, suggest policies, track commissions, and monitor the status of customer applications and claims."
        },
        {
            question: "Can customers update their personal information?",
            answer: "Yes, customers can log into their dashboard and update personal details such as contact info, beneficiaries, and payment preferences at any time."
        },
        {
            question: "How are policy renewals and reminders handled?",
            answer: "The platform sends automated reminders via email and SMS for upcoming policy renewals, premium due dates, and documentation requirements."
        },
        {
            question: "Can I speak with a live agent before purchasing a policy?",
            answer: "Yes, customers can schedule consultations or chat live with licensed agents who can guide them through the policy selection and application process."
        }
    ];

    const [likes, setLikes] = useState(Array(faqList.length).fill(0));

    const handleLike = (index) => {
        setLikes(prevLikes =>
            prevLikes.map((like, i) => (i === index ? like + 1 : like))
        );
    };

    return (
        <section className="dark:bg-gray-100 dark:text-gray-800">
            <div data-aos='fade-left' className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                <h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mt-4 mb-8 text-gray-600">
                    Common questions about using our Life Insurance Management Platform.
                </p>
                <div className="space-y-4">
                    {faqList.map((faq, index) => (
                        <details key={index} className="w-full border rounded-lg group transition-all">
                            <summary className="px-4 py-6 font-semibold text-lg text-gray-800 cursor-pointer group-open:text-blue-600 transition-colors">
                                {faq.question}
                            </summary>
                            <div className="px-4 pb-4 pt-0 ml-4 -mt-2 text-gray-600 text-base leading-relaxed relative">
                                <p>{faq.answer}</p>
                                <div className="flex justify-start items-center mt-4 space-x-2 text-sm text-gray-500">
                                    <button
                                        onClick={() => handleLike(index)}
                                        className="flex text-xl items-center gap-1 hover:text-blue-600 transition"
                                    >
                                        <span role="img" aria-label="like">👍</span>
                                        <span>Like</span>
                                    </button>
                                    <span className="text-xs text-gray-500">({likes[index]} votes)</span>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQs;
