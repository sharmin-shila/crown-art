import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import loginImg from "../../assets/login/login.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2">
            <img src={loginImg} alt="login img" className="w-2/3 m-auto" />
          </div>
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-200">
            <div className="card-body">
              <h1 className="text-3xl font-bold text-center text-[#90c641e6]">
                Login now!
              </h1>
              <form onSubmit={handleSubmit()}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="input input-bordered w-full"
                  />
                  {errors.email && (
                    <span className="text-red-600 py-2">Email is required</span>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-600 py-2">
                      Password is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-600 py-2">
                      Password must be 6 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-600 py-2">
                      Password must have one uppercase, one special character
                    </span>
                  )}
                </div>

                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Login"
                    className="btn bg-[#90c641e6] hover:btn-info hover:text-white text-white"
                  />
                </div>
              </form>

              <p>
                <small>
                  New Here?{" "}
                  <Link to="/sign-up">
                    <span className="text-warning font-semibold">
                      Create an account
                    </span>
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
