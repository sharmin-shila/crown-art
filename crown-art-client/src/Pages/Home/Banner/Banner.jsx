import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import slider01 from "../../../assets/slider/slider01.jpg";
import slider02 from "../../../assets/slider/slider02.jpg";
import slider03 from "../../../assets/slider/slider03.jpg";
import slider04 from "../../../assets/slider/slider04.jpg";
import slider05 from "../../../assets/slider/slider05.jpg";

const Banner = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className="relative">
            <img
              src={slider01}
              alt=""
              className="w-full max-h-[70vh] object-cover rounded-2xl"
            />
            <div className="bg-black bg-opacity-50 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-green-400 text-2xl md:text-4xl font-bold text-center mb-4">
                Elevate your skills
              </h3>
              <p className="text-green-100 text-xs md:text-base text-center font-light md:font-semibold px-14">
                Learn from industry leaders and reach your artistic goals faster
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src={slider02}
              alt=""
              className="w-full max-h-[70vh] object-cover rounded-2xl"
            />
            <div className="bg-black bg-opacity-50 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-green-400 text-2xl md:text-4xl font-bold text-center mb-4">
                Elevate your skills
              </h3>
              <p className="text-green-100 text-xs md:text-base text-center font-light md:font-semibold px-14">
                Learn from industry leaders and reach your artistic goals faster
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src={slider03}
              alt=""
              className="w-full max-h-[70vh] object-cover rounded-2xl"
            />
            <div className="bg-black bg-opacity-50 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-green-400 text-2xl md:text-4xl font-bold text-center mb-4">
                Elevate your skills
              </h3>
              <p className="text-green-100 text-xs md:text-base text-center font-light md:font-semibold px-14">
                Learn from industry leaders and reach your artistic goals faster
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src={slider04}
              alt=""
              className="w-full max-h-[70vh] object-cover rounded-2xl"
            />
            <div className="bg-black bg-opacity-50 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-green-400 text-2xl md:text-4xl font-bold text-center mb-4">
                Elevate your skills
              </h3>
              <p className="text-green-100 text-xs md:text-base text-center font-light md:font-semibold px-14">
                Learn from industry leaders and reach your artistic goals faster
              </p>
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="relative">
            <img
              src={slider05}
              alt=""
              className="w-full max-h-[70vh] object-cover rounded-2xl"
            />
            <div className="bg-black bg-opacity-50 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-green-400 text-2xl md:text-4xl font-bold text-center mb-4">
                Elevate your skills
              </h3>
              <p className="text-green-100 text-xs md:text-base text-center font-light md:font-semibold px-14">
                Learn from industry leaders and reach your artistic goals faster
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
