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
          delay: 5000,
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
            <div className="bg-black bg-opacity-70 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <div className="md:max-w-xl mx-auto">
                <h3 className="text-purple-500 text-xl md:text-3xl font-bold text-center mb-4">
                  Whispers of the Canvas: Exploring the Soul of Art
                </h3>
                <p className="text-purple-200 text-xs md:text-base text-center font-light md:font-normal px-14">
                  Dive into the silent language of brushstrokes, where canvases
                  echo with the profound narratives of unspoken emotions
                </p>
              </div>
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
            <div className="bg-black bg-opacity-70 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <div className="md:max-w-xl mx-auto">
                <h3 className="text-lime-500 text-xl md:text-3xl font-bold text-center mb-4">
                  Abstract Realms: A Journey Beyond Boundaries
                </h3>
                <p className="text-lime-200 text-xs md:text-base text-center font-light md:font-normal px-14">
                  Embark on a visual odyssey through abstract dimensions, where
                  imagination knows no constraints and creativity dances freely
                </p>
              </div>
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
            <div className="bg-black bg-opacity-70 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <div className="md:max-w-xl mx-auto">
                <h3 className="text-sky-500 text-xl md:text-3xl font-bold text-center mb-4">
                  Ethereal Elegance: Artistry Beyond the Brush
                </h3>
                <p className="text-sky-200 text-xs md:text-base text-center font-light md:font-normal px-14">
                  Witness the grace of artistic finesse as ethereal forms
                  unfold, transcending the ordinary with a touch of timeless
                  elegance
                </p>
              </div>
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
            <div className="bg-black bg-opacity-70 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <div className="md:max-w-xl mx-auto">
                <h3 className="text-emerald-500 text-xl md:text-3xl font-bold text-center mb-4">
                  Sculpting Dreams: Clay, Stone, and Beyond
                </h3>
                <p className="text-emerald-200 text-xs md:text-base text-center font-light md:font-normal px-14">
                  Experience the alchemy of dreams taking shape, as skilled
                  hands mold reality from the raw essence of clay and stone
                </p>
              </div>
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
            <div className="bg-black bg-opacity-70 rounded-2xl absolute inset-0 flex flex-col items-center justify-center">
              <div className="md:max-w-xl mx-auto">
                <h3 className="text-yellow-500 text-xl md:text-3xl font-bold text-center mb-4">
                  Infinite Impressions: A Palette of Infinite Perspectives
                </h3>
                <p className="text-yellow-200 text-xs md:text-base text-center font-light md:font-normal px-14">
                  Explore a kaleidoscope of perspectives, where each stroke adds
                  a new layer to the canvas of infinite impressions
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
