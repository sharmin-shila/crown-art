import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import Modal from "../Modal/Modal";

const StatusDetails = ({ isOpen, setIsOpen, courseId }) => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: courses = [] } = useQuery({
    queryKey: ["courses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/courses/instructor/${user?.email}`
      );
      return res.data;
    },
  });

  const course = courses.find((c) => c._id === courseId);

  const { name, seats, enrolled, status, feedback } = course || {};

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={name}>
      <div className="my-2 space-y-2">
        <p>
          <span className="font-medium">Seats:</span> {seats}
        </p>
        <p>
          <span className="font-medium">Total Enrolled:</span> {enrolled}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`capitalize font-medium p-1 text-white text-xs rounded-md ${
              status === "approved" ? "bg-emerald-600" : ""
            }${status === "denied" ? "bg-yellow-400" : ""}${
              status === "pending" ? "bg-cyan-400" : ""
            }`}
          >
            {status}
          </span>
        </p>
        {feedback && (
          <p>
            <span className="font-medium">Feedback:</span> {feedback}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-error text-white btn-xs"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default StatusDetails;
