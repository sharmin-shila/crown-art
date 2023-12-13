import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const EnrolledCourses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: courses = [] } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled-courses/${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      <div className="w-full px-6">
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className="bg-[#90c641e6]">
              <tr className="text-white capitalize">
                <th></th>
                <th>Name</th>
                <th>Course Fee</th>
                <th>Date</th>
                <th>Transaction Id</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course, idx) => (
                  <tr key={course._id}>
                    <th>{idx + 1}</th>

                    <td>
                      <div className="font-bold">{course?.courseName}</div>
                    </td>

                    <td>${course?.price}</td>

                    <td>{new Date(course?.date).toDateString()}</td>

                    <td>{course?.transactionId}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EnrolledCourses;
