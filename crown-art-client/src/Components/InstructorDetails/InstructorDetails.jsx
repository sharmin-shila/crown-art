import Modal from "../Modal/Modal";

const InstructorDetails = ({ isOpen, setIsOpen, instructorInfo }) => {
  const { name, image, email, bio, qualification, experience, teachingArea } =
    instructorInfo;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={""}
      bgColor={"bg-indigo-300"}
    >
      <div className="flex justify-center items-center mb-4">
        <img
          src={image}
          alt=""
          className="w-40 h-40 rounded-full object-fill"
        />
      </div>
      <div className="space-y-4 text-black">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p>
            <span className="font-bold">Email:</span> {email}
          </p>
        </div>
        {bio ? (
          <>
            <div>
              <p className="text-center font-bold mb-2">
                <span className="underline decoration-indigo-600 text-orange-500">
                  Biography
                </span>
              </p>
              <p>{bio}</p>
            </div>
            <div>
              <p className="text-center font-bold mb-2">
                <span className="underline decoration-indigo-600 text-rose-500">
                  Academic Qualification
                </span>
              </p>
              <p>{qualification}</p>
            </div>
            <div>
              <p className="text-center font-bold mb-2">
                <span className="underline decoration-indigo-600 text-blue-700">
                  Professional Experience
                </span>
              </p>
              <p>{experience}</p>
            </div>
            <div>
              <p className="text-center font-bold mb-2">
                <span className="underline decoration-indigo-600 text-emerald-700">
                  Teaching Area
                </span>
              </p>
              <p>{teachingArea}</p>
            </div>
          </>
        ) : (
          <h2 className="text-xl font-semibold text-center mt-3 text-red-400">
            Details coming soon...
          </h2>
        )}
      </div>
      <div className="flex justify-end mt-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn bg-purple-700 border-0 btn-xs text-white"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default InstructorDetails;
