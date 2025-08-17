import React from "react";

const StatsSection = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        
    
        <div data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-4xl font-extrabold text-blue-900">50K+</h2>
          <p className="text-gray-700 mt-2">Customers Served</p>
        </div>

    
        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-4xl font-extrabold text-blue-900">120K+</h2>
          <p className="text-gray-700 mt-2">Policies Sold</p>
        </div>


        <div data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-4xl font-extrabold text-blue-900">25+</h2>
          <p className="text-gray-700 mt-2">Years in Service</p>
        </div>


        <div data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-4xl font-extrabold text-blue-900">15+</h2>
          <p className="text-gray-700 mt-2">Partner Companies</p>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
