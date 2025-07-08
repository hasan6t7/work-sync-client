import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const location = useLocation();
  //   const [email, setEmail] = useState("");
  const { logInUser, setUser, logInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    logInUser(email, password)
      .then((result) => {
        const user = result.user;

        setUser(user);
        console.log(user)
        toast.success("Login Successfully Done");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log("error from hasan",error.message)
        toast.error(error.message);
      });
  };
  const handleLogInWithGoogle = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successfully Done");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center mt-20 mx-auto mb-20">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset border-green-400 rounded-box w-xs border-1 p-4 shadow-lg">
          <legend className="fieldset-legend font-bold text-green-700 text-3xl">
            Login Here!
          </legend>

          {/* Email */}
          <label className="label font-semibold">Email</label>
          <label className="input validator">
            <input
              type="email"
              name="email"
              autoComplete="current-email"
              placeholder="mail@site.com"
              required
            />
          </label>

          {/* Password */}
          <label className="label font-semibold">Password</label>
          <label className="input validator">
            <input
              type="password"
              required
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be at least 8 characters with a number, a lowercase letter, and an uppercase letter"
            />
          </label>
          <Link
            to="/forgot-password"
            className="mt-1 underline font-semibold opacity-70"
          >
            Forgot Password?
          </Link>
          <p className="validator-hint hidden">
            Must be at least 8 characters with:
            <br />• At least one number <br />• At least one lowercase letter{" "}
            <br />• At least one uppercase letter
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-gradient-to-r from-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-white mt-4"
          >
            Login
          </button>

          {/* Google */}
          <button
            onClick={handleLogInWithGoogle}
            type="button"
            className="btn bg-gradient-to-r from-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-white mt-2"
          >
            Login with Google
          </button>

          {/* Register link */}
          <p className="text-center font-semibold mt-2">
            Don't have an account?{" "}
            <Link className="text-green-600 text-sm" to={"/register"}>
              Register
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
