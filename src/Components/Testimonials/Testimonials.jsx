import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "HR Executive, WorkSync",
    image: "https://i.ibb.co/4K1wM9S/profile1.jpg",
    message:
      "WorkSync has transformed the way we track employee performance. It saves us hours every week.",
  },
  {
    id: 2,
    name: "Md. Rafiq",
    position: "Developer",
    image: "https://i.ibb.co/jD0RzYS/profile2.jpg",
    message:
      "The team is very supportive and the dashboard is very easy to use.",
  },
  {
    id: 3,
    name: "Anika Rahman",
    position: "Manager, HR",
    image: "https://i.ibb.co/1mThYr0/profile3.jpg",
    message:
      "Highly recommend WorkSync for any growing company. Clean interface and excellent support.",
  },
  {
    id: 4,
    name: "Tania Akter",
    position: "Team Lead",
    image: "https://i.ibb.co/SQc14MN/profile4.jpg",
    message: "Very user-friendly and a fantastic customer support experience!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-inner">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
          What People Say About Us
        </h2>
        <p className=" mb-12">
          WorkSync brings teams together by streamlining workflow and enhancing
          transparency. Our users come from diverse roles but share one thing —
          a passion for efficiency. Check out their honest feedback and discover
          why WorkSync works.
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          speed={1600}
          loop={true}
          className="w-full cursor-grab"
          style={{
            "--swiper-navigation-color": "#16a34a",
            "--swiper-pagination-color": "#16a34a",
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center text-center mx-auto max-w-md hover:shadow-2xl transition-transform duration-700 ease-in-out">
                <img
                  src={item.image}
                  alt={`Photo of ${item.name}`}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-green-100 transition-transform duration-700 hover:scale-105"
                />
                <h3 className="font-semibold text-2xl text-green-600">
                  {item.name}
                </h3>
                <p className="text-lg opacity-75  mb-2">{item.position}</p>
                <p className="text-gray-700 italic">“{item.message}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
