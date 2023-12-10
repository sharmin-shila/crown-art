import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";

const img_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const UpdateCourse = () => {
  const courseInfo = useLoaderData();

  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();

  const defaultValues = {
    name: courseInfo?.name,
    instructor: courseInfo?.instructor,
    email: courseInfo?.email,
    description: courseInfo?.description,
    seats: courseInfo?.seats,
    price: courseInfo?.price,
  };

  const { register, handleSubmit } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleUpdateCourse = (data) => {
    data.seats = parseInt(data.seats);
    data.price = parseFloat(data.price);

    if (data.image[0] === undefined) {
      data.image = courseInfo?.image;

      const updatedData = { ...data, status: "pending" };

      axiosSecure
        .put(
          `${import.meta.env.VITE_API_URL}/courses/${courseInfo?._id}`,
          updatedData
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Course updated successfully");
            navigate("/dashboard/course-list");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageResponse) => {
          data.image = imageResponse.data.display_url;

          const updatedData = { ...data, status: "pending" };

          axiosSecure
            .put(
              `${import.meta.env.VITE_API_URL}/courses/${courseInfo?._id}`,
              updatedData
            )
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                toast.success("Course updated successfully");
                navigate("/dashboard/course-list");
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        });
    }
  };

  return (
    <>
      <div className="w-full px-6">
        <form onSubmit={handleSubmit(handleUpdateCourse)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                defaultValue={defaultValues.name}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Image</span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered file-input-ghost w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Name
                </span>
              </label>
              <input
                type="text"
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
                {...register("seats", { required: true })}
                defaultValue={defaultValues.seats}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Fee</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                defaultValue={defaultValues.price}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text font-semibold">
                Course Description
              </span>
            </label>
            <textarea
              {...register("description", { required: true })}
              defaultValue={defaultValues.description}
              className="textarea textarea-bordered textarea-md w-full h-40"
            ></textarea>
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info bg-[#90c641e6] border-0 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCourse;
