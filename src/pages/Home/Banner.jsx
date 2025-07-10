import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

import img2 from '../../assets/father-daughter-putting-money-piggy-bank.jpg'
import img1 from '../../assets/hand-drawing-umbrella-tablet.jpg'
import img3 from '../../assets/middle-aged-couple-showing-thumb-up.jpg'
import img4 from '../../assets/happy-young-man-purchasing-vacation-package-with-credit-card-beautiful-loving-couple-paying-their-vacation-trip-holidays-travel-agency.jpg'


const Banner = () => {
    return (
        <div className='mx-auto m-6' >
       <Swiper
        direction={'vertical'}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay,Pagination]}
        className="mySwiper"
          style={{ height: '100vh' }}
      >
        {/* <div className='bg-gradient-to-tl from-[#29819c] to-[#c0c3cd]'> */}
            {/* swiper=1 */}
        <SwiperSlide>
            
          <div  className='flex items-center justify-center p-12 w-11/12 mx-auto ' data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">

         <div className=" rounded-2xl py-16 px-6 flex-1 ">
    <h1 className="text-4xl font-bold mb-4">
      "Every Little Saving Counts Towards a Safer Tomorrow."
    </h1>
    <p className="text-base mb-6">
      Whether it's a small deposit or a smart policy choice, each step you take today builds a stronger, more secure future for you and your loved ones.
    </p>
    
    <button
    type='button'
    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition'
  >
    Get A Quote
  </button>
  </div>
                
    <div className='flex-1'  >
   <motion.img
    src={img2}
    alt=""
    className="shadow-xl rounded-xl p-6 border-gray-500"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 3 }}
    whileHover={{ scale: 1.05 }}
  />
</div>

            </div>
        
        
        </SwiperSlide>
 
     {/*  */}

  <SwiperSlide>
            
          <div  className='flex flex-row-reverse  items-center justify-center p-12 w-11/12 mx-auto '
    
    >

         <div className=" rounded-2xl py-16 px-6 flex-1 ">
    <h1 className="text-4xl font-bold mb-4">
      "Every Little Saving Counts Towards a Safer Tomorrow."
    </h1>
    <p className="text-base mb-6">
      Whether it's a small deposit or a smart policy choice, each step you take today builds a stronger, more secure future for you and your loved ones.
    </p>
    
    <button
    type='button'
    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition'
  >
    Get A Quote
  </button>
  </div>
                
    <div className='flex-1'  >
   <motion.img
    src={img4}
    alt=""
    className="shadow-xl rounded-xl p-6 border-gray-500"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 3 }}
    whileHover={{ scale: 1.05 }}
  />
</div>

            </div>
        
        
        </SwiperSlide>


        {/* swiper-3 */}
           <SwiperSlide>
            
          <div  className='flex items-center justify-center p-12 w-11/12 mx-auto '
     data-aos-easing="linear"
     data-aos-duration="1500">

         <div className=" rounded-2xl py-16 px-6 flex-1 ">
    <h1 className="text-4xl font-bold mb-4">
      "Every Little Saving Counts Towards a Safer Tomorrow."
    </h1>
    <p className="text-base mb-6">
      Whether it's a small deposit or a smart policy choice, each step you take today builds a stronger, more secure future for you and your loved ones.
    </p>
    
    <button
    type='button'
    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition'
  >
    Get A Quote
  </button>
  </div>
                
    <div className='flex-1'  >
   <motion.img
    src={img3}
    alt=""
    className="shadow-xl rounded-xl p-6 border-gray-500"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    whileHover={{ scale: 1.05 }}
  />
</div>

            </div>
        
        
        </SwiperSlide>
        {/* swiper-4 */}
       
          <SwiperSlide>
            
          <div  className='flex flex-row-reverse  items-center justify-center p-12 w-11/12 mx-auto '
    
    >

         <div className=" rounded-2xl py-16 px-6 flex-1 ">
    <h1 className="text-4xl font-bold mb-4">
      "Every Little Saving Counts Towards a Safer Tomorrow."
    </h1>
    <p className="text-base mb-6">
      Whether it's a small deposit or a smart policy choice, each step you take today builds a stronger, more secure future for you and your loved ones.
    </p>
    
    <button
    type='button'
    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition'
  >
    Get A Quote
  </button>
  </div>
                
    <div className='flex-1'  >
   <motion.img
    src={img1}
    alt=""
    className="shadow-xl rounded-xl p-6 border-gray-500"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 3 }}
    whileHover={{ scale: 1.05 }}
  />
</div>

            </div>
        
        
        </SwiperSlide>
     
      
      </Swiper>
      </div>
    );
};

export default Banner;