import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const EnrolledCourseDetails = () => {
  const { id } = useParams();
  const [axiosSecure] = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-details/${id}`);
      return res.data;
    },
  });
  console.log(data);
  return (
    <>
      <div className="px-6">
        <div className="border-2 border-gray-400 h-screen p-4 rounded">
          <div className="mb-3">
            <img
              src={data?.image}
              alt=""
              className="w-48 h-32 object-fill mx-auto rounded"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-center">
              {data?.courseName}
            </h2>
            <p className="text-justify">{data?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolledCourseDetails;
