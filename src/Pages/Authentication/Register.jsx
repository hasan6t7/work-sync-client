import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUser, setUser, logInWithGoogle } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const bank_account_no = form.bank_account_no.value;
    const salary = parseFloat(form.salary.value);
    const designation = form.designation.value;

    createUser(email, password)
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          name,
          email,
          role,
          bank_account_no,
          salary,
          designation,
          verified: false,
          photo: profilePic,
          created_at: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        if (userRes.data.insertedId) {
          toast.success("User saved to database!");
        }

        updateUser({ displayName: name, photoURL: profilePic })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: profilePic });
            Swal.fire({
              title: "Register Successfully Done!",
              icon: "success",
              draggable: true,
            });

            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
            navigate("/");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
  };

  const handleLogInWithGoogle = async () => {
    try {
      const result = await logInWithGoogle();
      const user = result.user;
      setUser(user);

      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        role: "Employee",
        bank_account_no: "N/A",
        salary: 0,
        verified: false, 
        designation: "Employee",
        created_at: new Date().toISOString(),
      };

      try {
        const userRes = await axiosInstance.post("/users", userInfo);

        if (userRes.data.insertedId) {
          toast.success("Google account registered and saved to database!");
        } else {
          toast.info("Welcome back! ");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          navigate(`${location.state ? location.state : "/"}`);
        } else {
          throw error;
        }
      }

      toast.success("Login Successfully Done!");
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center my-20 mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <link rel="canonical" />
      </Helmet>
      <form onSubmit={handleRegister}>
        <fieldset className="fieldset  border-green-400 rounded-box w-xs border-1 p-4 shadow-lg">
          <legend className="fieldset-legend font-bold text-green-700 text-3xl">
            Please Register !
          </legend>
          {/* Name  */}
          <label className="label font-semibold ">Name</label>
          <input
            type="text"
            autoComplete="current-name"
            name="name"
            className="input"
            placeholder="Name"
            required
          />

          {/* name end  */}

          {/* Email start */}
          <label className="label font-semibold">Email</label>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              autoComplete="current-email"
              name="email"
              placeholder="mail@site.com"
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          {/* Email End  */}
          {/* Role   */}
          <label className="label font-semibold ">Role</label>
          <select name="role" defaultValue="Select Role" className="select">
            <option disabled={true}>Select Role</option>
            <option>Employee</option>
            <option>HR</option>
          </select>

          {/* role end  */}

          {/* Photo Url start  */}
          <label className="label font-semibold ">Photo</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="input"
            placeholder="Your Profile picture"
          />

          {/* Photo url end  */}

          {/* designation  */}
          <label className="label font-semibold ">Designation</label>
          <input
            type="text"
            name="designation"
            className="input"
            placeholder="e.g., Sales Assistant"
            required
          />
          {/* designation end */}
          {/* Bank Account */}
          <label className="label font-semibold ">Bank Account No</label>
          <input
            type="text"
            name="bank_account_no"
            className="input"
            placeholder="e.g., 017xxxxxxxx"
            required
          />
          {/* Bank Account end */}

          <label className="label font-semibold ">Salary</label>
          <input
            type="number"
            name="salary"
            className="input"
            placeholder="e.g., 25000"
            required
          />

          {/* PassWord start  */}
          <label className="label font-semibold">Password</label>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              autoComplete="current-password"
              name="password"
              placeholder="Password"
              minLength="6"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must be at least 6 characters, including a number, a lowercase letter, and an uppercase letter"
            />
          </label>

          <p className="validator-hint hidden">
            Must be more than 6 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
          {/* password end  */}

          <button
            type="submit"
            className="btn btn-neutral bg-gradient-to-r from-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-white border-none hover:bg-green-600 mt-4"
          >
            Register
          </button>
          <button
            onClick={handleLogInWithGoogle}
            type="button"
            className="btn bg-gradient-to-r from-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-white border-none hover:bg-green-600 "
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <p className="text-center font-semibold">
            Already have an account ?{" "}
            <Link className="text-green-600 text-sm" to={"/login"}>
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
