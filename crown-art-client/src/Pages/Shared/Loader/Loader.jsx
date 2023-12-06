import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <FadeLoader size={20}></FadeLoader>
    </div>
  );
};

export default Loader;
