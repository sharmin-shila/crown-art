import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ManageCourses = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: courses = [], refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/courses/admin`
      );
      return res.data;
    },
  });

  const handleApprove = (course) => {
    axiosSecure
      .patch(
        `${import.meta.env.VITE_API_URL}/courses/admin/approve/${course?._id}`
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${course?.name} is Approved`);
        }
      });
  };

  const handleDeny = (course) => {
    axiosSecure
      .patch(
        `${import.meta.env.VITE_API_URL}/courses/admin/deny/${course?._id}`
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${course?.name} is Denied`);
        }
      });
  };

  return (
    <>
      <div className="w-full px-6">
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className="bg-[#90c641e6]">
              <tr className="text-white">
                <th></th>
                <th>Course Name</th>
                <th>Status</th>
                <th></th>
                <th></th>
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
                          <img src={course.image} alt="Avatar" />
                        </div>
                      </div>
                      <div className="font-medium">{course.name}</div>
                    </div>
                  </td>

                  <td>
                    <div className="capitalize font-medium">
                      {course.status}
                    </div>
                  </td>

                  <th>
                    {course?.status === "approved" && (
                      <button
                        onClick={() => handleDeny(course)}
                        className="btn btn-warning btn-xs text-white capitalize"
                      >
                        deny
                      </button>
                    )}

                    {course?.status === "denied" && (
                      <Link to={`/dashboard/feedback/${course._id}`}>
                        <button className="btn btn-info btn-xs text-white capitalize">
                          feedback
                        </button>
                      </Link>
                    )}

                    {course?.status === "pending" && (
                      <div className="space-y-2">
                        <div>
                          <button
                            onClick={() => handleApprove(course)}
                            className="btn btn-success btn-xs text-white capitalize"
                          >
                            approve
                          </button>
                        </div>

                        <div>
                          <button
                            onClick={() => handleDeny(course)}
                            className="btn btn-warning btn-xs text-white capitalize"
                          >
                            deny
                          </button>
                        </div>

                        <div>
                          <Link to={`/dashboard/feedback/${course._id}`}>
                            <button className="btn btn-info btn-xs text-white capitalize">
                              feedback
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </th>

                  <th>
                    <button className="btn bg-green-300 btn-sm">Details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageCourses;
