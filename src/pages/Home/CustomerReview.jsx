import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaStar, FaRegStar } from 'react-icons/fa';

const CustomerReview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ['customerReviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews?limit=5&sort=latest');
      return res.data;
    },
  });
 console.log(reviews)
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-500" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );

  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>

      <Swiper
      autoplay={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="bg-white p-6 rounded-xl shadow-lg w-72 sm:w-80 mx-auto text-center">
              <img
                src={review.image }
                alt={review.Name}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <div className="flex justify-center my-2">{renderStars(review.rating)}</div>
              <p className="text-gray-600 text-sm line-clamp-5">{review.message}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerReview;
