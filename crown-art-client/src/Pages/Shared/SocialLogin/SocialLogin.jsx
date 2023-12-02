import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth/useAuth";
import googleImg from "../../../assets/social/google.png";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Profile created successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="divider text-warning font-medium">Or Sign in with</div>
      <div className="text-center">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle btn-outline border-0"
        >
          <img src={googleImg} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
