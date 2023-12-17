import { Link } from "react-router-dom";
import img1 from "../../../assets/whyUs/piggy-bank-green-icon.svg";
import img2 from "../../../assets/whyUs/hand-with-brush-green-icon.svg";
import img3 from "../../../assets/whyUs/video-green-icon.svg";

const WhyUs = () => {
  return (
    <div className="mt-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-4xl font-semibold mb-2">
          Why Crown Art?
        </h2>
        <hr className="border-[1px] border-[#90c641e6] w-4/12 md:w-2/12  mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card w-full shadow-xl">
          <figure className="px-10 pt-10">
            <img src={img1} className="rounded-xl h-32" />
          </figure>
          <div className="card-body items-center text-center">
            <p>
              Learn to draw, paint, and design from the comfort of your home for
              a fraction of the cost of traditional art school.
            </p>
            <Link to="/login">
              <h4 className="card-title text-base font-bold uppercase text-[#90c641e6]">
                SUBSCRIBE
              </h4>
            </Link>
          </div>
        </div>
        <div className="card w-full shadow-xl">
          <figure className="px-10 pt-10">
            <img src={img2} className="rounded-xl h-32" />
          </figure>
          <div className="card-body items-center text-center">
            <p>
              Your instructors will be top professionals in the art industry who
              are doing the dream jobs that you want.
            </p>
            <Link to="/">
              <h4 className="card-title text-base font-bold uppercase text-[#90c641e6]">
                MEET THE INSTRUCTORS
              </h4>
            </Link>
          </div>
        </div>
        <div className="card w-full shadow-xl">
          <figure className="px-10 pt-10">
            <img src={img3} className="rounded-xl h-32" />
          </figure>
          <div className="card-body items-center text-center">
            <p>
              Control your own schedule, have easy access to pre-recorded
              lectures that you can re-watch as many times as you want.
            </p>
            <Link to="/courses">
              <h4 className="card-title text-base font-bold uppercase text-[#90c641e6]">
                OUR COURSES
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
