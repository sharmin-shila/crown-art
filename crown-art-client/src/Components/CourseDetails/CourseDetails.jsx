import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import Modal from "../Modal/Modal";

const CourseDetails = ({ isOpen, setIsOpen, id }) => {
  const [axiosSecure] = useAxiosSecure();

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/courses/admin`
      );
      return res.data;
    },
  });

  const courseDetails = courses.find((course) => course._id === id);
  const {
    name,
    image,
    instructor,
    email,
    description,
    status,
    seats,
    enrolled,
    price,
  } = courseDetails || {};
  console.log(courseDetails);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={name}>
      <div className="mt-4 text-black space-y-4">
        <div>
          <img src={image} alt="" className="w-full rounded-md" />
        </div>
        <div>
          <h2>
            <span className="font-medium">Instructor:</span> {instructor}
          </h2>
          <p>
            <span className="font-medium">Email:</span> {email}
          </p>
        </div>
        <div>
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex justify-between">
          <p className="capitalize">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`font-medium p-1 text-white text-xs rounded-md ${
                status === "approved" ? "bg-emerald-600" : ""
              }${status === "denied" ? "bg-yellow-400" : ""}${
                status === "pending" ? "bg-cyan-400" : ""
              }`}
            >
              {status}
            </span>
          </p>
          <p>
            <span className="font-medium">Course Fee:</span>{" "}
            <span className="text-lg">{"\u09F3"}</span>
            {price}
          </p>
        </div>
        <div className="flex justify-between">
          <p>
            <span className="font-medium">Available Seats:</span> {seats}
          </p>
          <p>
            <span className="font-medium">Enrolled:</span> {enrolled}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(false)}
          className="btn bg-red-500 hover:bg-red-400 transition-all text-white btn-md"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CourseDetails;
