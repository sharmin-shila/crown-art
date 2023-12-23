import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import StatusDetails from "../../../Components/StatusDetails/StatusDetails";
import toast from "react-hot-toast";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";

const CourseList = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState(0);

  const [axiosSecure] = useAxiosSecure();

  const { data: courses = [], refetch } = useQuery({
    queryKey: ["courses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/courses/instructor/${user?.email}`
      );
      return res.data;
    },
  });

  const handleModal = (id) => {
    setCourseId(id);
    setIsOpen(!isOpen);
  };

  const handleDelete = (course) => {
    axiosSecure.delete(`/courses/${course?._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Your course has been deleted");
      }
    });
  };

  return (
    <>
      <StatusDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        courseId={courseId}
      />
      <div className="w-full px-6">
        {courses && Array.isArray(courses) && courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-[#90c641e6]">
                <tr className="text-white capitalize">
                  <th></th>
                  <th>Name</th>
                  <th>Course Fee</th>
                  <th>Status</th>
                  <th>Update</th>
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

                    {/* <td>{course.enrolled}</td> */}

                    {/* <td>{course?.feedback}</td> */}

                    <td>
                      <button
                        onClick={() => handleModal(course._id)}
                        className="btn btn-ghost btn-sm"
                      >
                        <FcViewDetails size={20}></FcViewDetails>
                      </button>
                    </td>

                    <td>
                      <Link to={`/dashboard/update-course/${course._id}`}>
                        <button className="btn btn-ghost btn-sm">
                          <FaEdit className="text-success" size={20}></FaEdit>
                        </button>
                      </Link>
                    </td>

                    <th>
                      <button
                        onClick={() => handleDelete(course)}
                        className="btn btn-ghost btn-sm"
                      >
                        <RiDeleteBin6Line
                          className="text-error"
                          size={20}
                        ></RiDeleteBin6Line>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You haven't added any course. Add first!"}
            address={"/dashboard/add-course"}
            label={"add course"}
          />
        )}
      </div>
    </>
  );
};

export default CourseList;
