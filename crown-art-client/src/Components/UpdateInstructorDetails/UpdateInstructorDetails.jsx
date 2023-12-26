import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateInstructorDetails = ({
  isOpen,
  setIsOpen,
  instructorInfo,
  refetch,
}) => {
  const { name, email, image, bio, qualification, experience, teachingArea } =
    instructorInfo;

  const [axiosSecure] = useAxiosSecure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_KEY
  }`;

  const handleUpdateProfile = (data) => {
    if (data.image[0] === undefined) {
      data.image = image;

      axiosSecure
        .put(`${import.meta.env.VITE_API_URL}/instructor/${email}`, data)
        .then((res) => {
          console.log(res);
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Profile updated successfully");
            setIsOpen(!isOpen);
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

          axiosSecure
            .put(`${import.meta.env.VITE_API_URL}/instructor/${email}`, data)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Profile updated successfully");
                setIsOpen(!isOpen);
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        });
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={name}>
      <div className="mt-4">
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
                defaultValue={name}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600 py-2">
                  {errors.name?.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Profile Photo</span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered file-input-ghost w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Biography</span>
              </label>
              <textarea
                placeholder="Write something about you..."
                {...register("bio", { required: "Biography is required" })}
                defaultValue={bio}
                className="textarea textarea-bordered textarea-md w-full h-20"
              ></textarea>
              {errors.bio && (
                <span className="text-red-600 py-2">{errors.bio?.message}</span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Academic Qualification
                </span>
              </label>
              <textarea
                placeholder="Write something about your academic qualification..."
                {...register("qualification", {
                  required: "Academic Qualification is required",
                })}
                defaultValue={qualification}
                className="textarea textarea-bordered textarea-md w-full h-20"
              ></textarea>
              {errors.qualification && (
                <span className="text-red-600 py-2">
                  {errors.qualification?.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Professional Experience
                </span>
              </label>
              <textarea
                placeholder="Write something about your professional experience..."
                {...register("experience", {
                  required: "Professional Experience is required",
                })}
                defaultValue={experience}
                className="textarea textarea-bordered textarea-md w-full h-20"
              ></textarea>
              {errors.experience && (
                <span className="text-red-600 py-2">
                  {errors.experience?.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Teaching Area</span>
              </label>
              <textarea
                placeholder="Write something about teaching area..."
                {...register("teachingArea", {
                  required: "Teaching Area is required",
                })}
                defaultValue={teachingArea}
                className="textarea textarea-bordered textarea-md w-full h-20"
              ></textarea>
              {errors.teachingArea && (
                <span className="text-red-600 py-2">
                  {errors.teachingArea?.message}
                </span>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <input
              type="submit"
              value="Update Profile"
              className="btn btn-info bg-[#90c641e6] border-0 text-white btn-md"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateInstructorDetails;
