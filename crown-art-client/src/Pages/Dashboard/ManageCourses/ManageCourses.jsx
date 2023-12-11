import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CourseDetails from "../../../Components/CourseDetails/CourseDetails";

const ManageCourses = () => {
  const [axiosSecure] = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState(0);

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

  const handleModal = (id) => {
    setCourseId(id);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <CourseDetails isOpen={isOpen} setIsOpen={setIsOpen} id={courseId} />
      <div className="w-full px-6">
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className="bg-[#90c641e6]">
              <tr className="text-white">
                <th></th>
                <th>Course Name</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Actions</th>
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
                    <div
                      className={`capitalize font-medium p-1 text-white text-xs rounded-md ${
                        course.status === "approved" ? "bg-emerald-600" : ""
                      }${course.status === "denied" ? "bg-yellow-400" : ""}${
                        course.status === "pending" ? "bg-cyan-400" : ""
                      }`}
                    >
                      {course.status}
                    </div>
                  </td>

                  <td>
                    {course?.feedback && (
                      <div className="bg-base-200 w-36 h-full p-1 rounded-md text-xs">
                        {course?.feedback}
                      </div>
                    )}
                  </td>

                  <th>
                    {course?.status === "denied" &&
                      course?.feedback === undefined && (
                        <Link to={`/dashboard/course-feedback/${course._id}`}>
                          <button className="btn bg-blue-500 hover:bg-blue-400 transition-all btn-xs text-white capitalize w-full">
                            feedback
                          </button>
                        </Link>
                      )}

                    {course?.status === "pending" && (
                      <div className="space-y-2">
                        <div>
                          <button
                            onClick={() => handleApprove(course)}
                            className="btn bg-emerald-600 hover:bg-emerald-500 transition-all btn-xs text-white capitalize w-full"
                          >
                            approve
                          </button>
                        </div>

                        <div>
                          <Link to={`/dashboard/course-feedback/${course._id}`}>
                            <button
                              onClick={() => handleDeny(course)}
                              className="btn bg-yellow-400 hover:bg-yellow-300 transition-all btn-xs text-white capitalize w-full"
                            >
                              deny
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </th>

                  <th>
                    <button
                      onClick={() => handleModal(course._id)}
                      className="btn bg-green-300 btn-sm"
                    >
                      Details
                    </button>
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
