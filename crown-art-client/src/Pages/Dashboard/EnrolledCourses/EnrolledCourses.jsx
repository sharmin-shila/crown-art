import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";
import { Link } from "react-router-dom";

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
  console.log(courses);

  return (
    <>
      <div className="w-full px-6">
        {courses && Array.isArray(courses) && courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-[#90c641e6]">
                <tr className="text-white capitalize">
                  <th></th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Transaction Id</th>
                  <th></th>
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

                      <td>{new Date(course?.date).toDateString()}</td>

                      <td>{course?.transactionId}</td>

                      <th>
                        <Link to={`/dashboard/details/${course?._id}`}>
                          <button className="btn bg-indigo-500 border-0 btn-sm">
                            Details
                          </button>
                        </Link>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You didn't enrolled any course. Pay first!"}
            address={"/dashboard/selected-courses"}
            label={"pay"}
          />
        )}
      </div>
    </>
  );
};

export default EnrolledCourses;
