import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`);
  return response.json();
};

const Courses = () => {
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchData,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
        {courses.map((course) => (
          <div
            key={course._id}
            className="card card-compact w-96 bg-purple-300 shadow-xl"
          >
            <figure className="px-10 pt-10">
              <img src={course.image} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="text-2xl font-medium">{course.name}</h2>
              <h2 className="text-xl font-medium">
                Instructor: {course.instructor}
              </h2>
              <p className="text-xs font-medium">{course.description}</p>
              <p className="font-medium">Available Seats: {course.seats}</p>
              <p className="font-medium">
                Course Fee: <span className="text-lg">{"\u09F3"}</span>
                {course.price}
              </p>
              <div className="card-actions">
                <button className="btn bg-purple-600 btn-md">Enroll Course</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
