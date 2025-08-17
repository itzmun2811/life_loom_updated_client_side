import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

import img2 from '../../assets/father-daughter-putting-money-piggy-bank.jpg';
import img1 from '../../assets/hand-drawing-umbrella-tablet.jpg';
import img3 from '../../assets/middle-aged-couple-showing-thumb-up.jpg';
import img4 from '../../assets/happy-young-man-purchasing-vacation-package-with-credit-card-beautiful-loving-couple-paying-their-vacation-trip-holidays-travel-agency.jpg';

const Banner = () => {
  return (
    <div className='mx-8 mt-12 md:mx-auto lg:mx-auto my-6
     bg-[#F9F3EF] text-[#1B3C53]' 
     style={{ height: 'calc(100vh - 180px)' }}>
      <Swiper
        direction="vertical"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-full "
      >
        {/* Slide 1 */}
        <SwiperSlide className="h-full p-10">
          <div className='flex flex-col gap-8 md:flex-row items-center justify-center
           py-4 md:py-6 px-2 md:px-4 w-full h-full'>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                "Every Little Saving Counts Towards a Safer Tomorrow."
              </h1>
              <p className="text-sm md:text-base mb-6">
                Whether it's a small deposit or a smart policy choice, each step you take today builds a stronger, more secure future for you and your loved ones.
              </p>
              <button
                type='button'
                className='
                bg-[#456882] hover:bg-[#1B3C53]
                text-white font-semibold py-3 px-6 rounded-lg transition'
              >
                Get A Quote
              </button>
            </div>
            <div className='flex-1'>
              <motion.img
                src={img2}
                alt=""
                className="w-full max-w-md mx-auto md:max-w-full 
                shadow-xl rounded-xl p-4 bg-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3 }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="h-full p-10">
          <div className='flex gap-8 flex-col md:flex-row-reverse items-center justify-center py-4 md:py-6 px-2 md:px-4 w-full h-full'>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                "Live Freely, We've Got You Covered"
              </h1>
              <p className="text-sm md:text-base mb-6">
                Enjoy every moment knowing your life insurance plan supports your journey, even on life’s greatest adventures.
              </p>
              <button
                type='button'
                className='bg-[#456882] hover:bg-[#1B3C53] text-white font-semibold py-3 px-6 rounded-lg transition'
              >
                Get A Quote
              </button>
            </div>
            <div className='flex-1'>
              <motion.img
                src={img4}
                alt=""
                className="w-full max-w-md mx-auto bg-white md:max-w-full shadow-xl rounded-xl p-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3 }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="h-full p-10">
          <div className='flex flex-col gap-8 md:flex-row items-center justify-center py-4 md:py-6 px-2 md:px-4 w-full h-full'>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                "Plan Today for Peace of Mind Tomorrow"
              </h1>
              <p className="text-sm md:text-base mb-6">
                Protect your loved ones with reliable life insurance. It’s never too late to make the right choice.
              </p>
              <button
                type='button'
                className='bg-[#456882] hover:bg-[#1B3C53] text-white font-semibold py-3 px-6 rounded-lg transition'
              >
                Get A Quote
              </button>
            </div>
            <div className='flex-1'>
              <motion.img
                src={img3}
                alt=""
                className="w-full max-w-md mx-auto md:max-w-full
                bg-white shadow-xl rounded-xl p-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide className="h-full p-10">
          <div className='flex flex-col gap-8 md:flex-row-reverse items-center justify-center py-4 md:py-6 px-2 md:px-4 w-full h-full'>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                "Comprehensive Protection, Simple Planning"
              </h1>
              <p className="text-sm md:text-base mb-6">
                Life is unpredictable, but your coverage doesn’t have to be. Discover flexible, all-in-one life insurance plans.
              </p>
              <button
                type='button'
                className='bg-[#456882] hover:bg-[#1B3C53] text-white font-semibold py-3 px-6 rounded-lg transition'
              >
                Get A Quote
              </button>
            </div>
            <div className='flex-1'>
              <motion.img
                src={img1}
                alt=""
                className="w-full max-w-md bg-white mx-auto md:max-w-full shadow-xl rounded-xl p-4"
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
