import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const CustomerReview = () => {
  const axiosInstance= useAxios();

  const { data: reviews = [] } = useQuery({
    queryKey: ['customerReviews'],
    queryFn: async () => {
      const res = await axiosInstance.get('/reviews?limit=8&sort=latest');
      return res.data;
    },
  });

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );

  return (
    <section className="mt-12 py-10 w-11/12 bg-gradient-to-br from-gray-100 to-white px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-sky-700">
        💬 Customer Reviews
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        grabCursor={true}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {reviews.map((review) => (
       <SwiperSlide key={review._id}>
  <div className="bg-white  flex flex-col
   justify-between rounded-xl shadow-md hover:shadow-xl p-6 h-full
   border border-gray-200 transition duration-300">
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src={review.image || 'https://via.placeholder.com/80'}
        alt={review.name}
        className="w-20 h-20 rounded-full object-cover border-4 border-sky-600 shadow-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
      <div className="flex justify-center mt-1 mb-3">
        {renderStars(review.rating)}
      </div>
      <p className="text-sm text-gray-700 line-clamp-4">
        “{review.message}”
      </p>
    </div>
  </div>
</SwiperSlide>

        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReview;
