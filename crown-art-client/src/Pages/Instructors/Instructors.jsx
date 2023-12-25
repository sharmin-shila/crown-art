import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import InstructorDetails from "../../Components/InstructorDetails/InstructorDetails";

const fetchData = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/instructors`);
  return response.json();
};

const Instructors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [instructorInfo, setInstructorInfo] = useState({});

  const { data: instructors = [] } = useQuery({
    queryKey: ["instructors"],
    queryFn: fetchData,
  });

  const handleModal = (data) => {
    setInstructorInfo(data);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <InstructorDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        instructorInfo={instructorInfo}
      />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-5">
        {instructors &&
          instructors?.map((instructor) => (
            <div
              key={instructor._id}
              className="card card-compact w-full text-indigo-800 bg-indigo-300 shadow-xl"
            >
              <figure className="px-10 pt-10">
                <img
                  src={instructor?.image}
                  className="w-40 h-40 rounded-full object-fill"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{instructor?.name}</h2>
                <p>
                  <span className="font-bold">Email:</span> {instructor?.email}
                </p>
                <div className="card-actions">
                  <button
                    onClick={() => handleModal(instructor)}
                    className="btn bg-indigo-500 border-0 btn-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Instructors;
