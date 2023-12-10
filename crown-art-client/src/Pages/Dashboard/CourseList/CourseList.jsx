import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const CourseList = () => {
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
                  <th>Course Fee</th>
                  <th>Total Enrolled</th>
                  <th>Feedback</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={course._id}>
                    <th>{idx + 1}</th>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-40 h-20 rounded">
                            <img src={course?.image} alt="" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{course?.name}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="font-medium">
                        <span className="text-lg">{"\u09F3"}</span>
                        {course.price}
                      </div>
                    </td>

                    <td>{course.enrolled}</td>

                    <td>{course?.feedback}</td>

                    <td>
                      <div className="capitalize font-medium">
                        {course.status}
                      </div>
                    </td>

                    <td>
                      <Link to={`/dashboard/update-course/${course._id}`}>
                        <button className="btn btn-ghost btn-sm">
                          <FaEdit size={20}></FaEdit>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CourseList;
