import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const img_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const AddCourse = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();

  const defaultValues = {
    instructor: user?.displayName,
    email: user?.email,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleAddCourse = (data) => {
    data.seats = parseInt(data.seats);
    data.price = parseFloat(data.price);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        data.image = imageResponse.data.display_url;
        data.status = "pending";
        data.enrolled = parseInt(0);

        axiosSecure
          .post(`${import.meta.env.VITE_API_URL}/classes`, data)
          .then((res) => {
            if (res.data.insertedId) {
              reset();
              toast.success("Class added successfully");
              navigate("/dashboard/my-classes");
            }
          });
      });
  };

  return (
    <>
      <div className="w-full px-6">
        <form onSubmit={handleSubmit(handleAddCourse)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Name</span>
              </label>
              <input
                type="text"
                placeholder="Course Name"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600 py-2">
                  Course Name is required
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Image</span>
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input file-input-bordered file-input-ghost w-full"
              />
              {errors.image && (
                <span className="text-red-600 py-2">
                  Course Image is required
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Instructor Name"
                {...register("instructor")}
                defaultValue={defaultValues.instructor}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                defaultValue={defaultValues.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Available Seats
                </span>
              </label>
              <input
                type="number"
                placeholder="Available Seats"
                {...register("seats", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.seats && (
                <span className="text-red-600 py-2">
                  Available Seats is required
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Fee</span>
              </label>
              <input
                type="number"
                placeholder="Course Fee"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.price && (
                <span className="text-red-600 py-2">
                  Course Fee is required
                </span>
              )}
            </div>
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Add Course"
              className="btn btn-info bg-[#90c641e6] border-0 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
