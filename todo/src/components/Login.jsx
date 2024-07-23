/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount, login, resetCredential } from "../utils/Request";

export default function Login({ signup, setSignup, setuser, user }) {
  const initial_fields = {
    email: "",
    password: "",
    username: "",
    confirmpassword: "",
    security: "",
  };

  const errorState = {
    login: {
      isTrue: false,
      erro: "",
    },
    signup: {
      isTrue: false,
      error: "",
    },
    reset: {
      isTrue: false,
      error: "",
    },
    passwordmatch: {
      isTrue: false,
    },
  };
  const [formData, setformData] = useState(initial_fields);

  const [error, setError] = useState(errorState);
  const [resetpassword, setResetpassword] = useState(false);
  const navigate = useNavigate();

  //console.log(errorState.passwordmatch.isTrue);
  //console.log(formData);
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (signup && !resetpassword) {
      if (formData.password === formData.confirmpassword) {
        setError((prev) => ({ ...prev, passwordmatch: { isTrue: false } })); //resetting the error state for password match
        console.log("password matched");

        createAccount(formData)
          .then((userdata) => {
            console.log(userdata);
            setuser(userdata.user);
            setSignup(false);
            //navigating to dashboard after the promise resolved
            navigate(
              userdata === undefined
                ? "/"
                : `/dashboard/${userdata.user._id.toString()}`
            );
          })
          .catch((err) => {
            console.log("signup failed");
            setError((prev) => ({
              ...prev,
              signup: { isTrue: false, eror: err.response.data.msg },
            }));
          });
      } else {
        setError((prev) => ({ ...prev, passwordmatch: { isTrue: true } }));
      }
    } else if (resetpassword) {
      // reset password handler

      resetCredential(formData)
        .then((value) => {
          console.log("Reset Success");

          setResetpassword(false);
          setformData((prev) => initial_fields);
          setError((prev) => errorState);
        })
        .catch((err) => {
          console.log("error here", err.response.data.msg);
          setError((prev) => ({
            ...prev,
            reset: { isTrue: true, error: err.response.data.msg },
          }));
        });
    } else {
      login(formData)
        .then((userdata) => {
          console.log(userdata);
          setuser(userdata.user);
          setError((prev) => errorState);
          navigate(
            userdata === undefined
              ? "/"
              : `/dashboard/${userdata.user._id.toString()}`
          );
        })
        .catch((err) => {
          console.log("login error!!!");
          setError((prev) => ({
            ...prev,
            login: { isTrue: true, error: err.response.data.msg },
          }));
        });
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900  ">
        {!signup ? (
          <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className=" h-8 mr-2" src="./image.png" alt="logo" />
             
           Todo App
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  {resetpassword
                    ? "Reset Your Password"
                    : "Sign in to your account"}
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setformData((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  {resetpassword && (
                    <div>
                      <label
                        htmlFor="security"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Please Enter your Security Key
                      </label>
                      <input
                        type="text"
                        name="security"
                        id="security"
                        value={formData.security}
                        onChange={(e) =>
                          setformData((prev) => ({
                            ...prev,
                            [e.target.id]: e.target.value,
                          }))
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="eg: An01Kl"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) =>
                        setformData((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    {resetpassword && (
                      <a
                        href="#"
                        onClick={() => {
                          setResetpassword((prev) => false);
                          setError((prev) => errorState);
                        }}
                        className="text-sm font-medium text-slate-400 hover:underline "
                      >
                        Want to Sign in?
                      </a>
                    )}

                    <div
                      className={`${
                        resetpassword && "hidden"
                      } flex items-start`}
                    >
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      onClick={() => {
                        setResetpassword(true);
                        setError(errorState);
                      }}
                      className={`text-sm font-medium text-slate-400 hover:underline   ${
                        resetpassword && "hidden"
                      }`}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <label
                    htmlFor="reset error"
                    className={`${
                      error.reset.isTrue ? "" : "hidden"
                    } block  text-sm font-medium text-gray-900 dark:text-red-600`}
                  >
                    {error.reset.error}
                  </label>
                  <label
                    htmlFor="sign in error"
                    className={`${
                      error.login.isTrue ? "" : "hidden"
                    } block  text-sm font-medium text-gray-900 dark:text-red-600`}
                  >
                    {error.login.error}
                  </label>

                  <button
                    type="submit"
                    className="w-full text-white bg-rose-600 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handlesubmit}
                  >
                    {resetpassword ? "Reset Password" : "Sign in"}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      onClick={() => {
                        setSignup(true);
                        setResetpassword(false);
                        setError((prev) => errorState);
                      }}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Flowbite
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up for a new account
                </h1>
                <form className="space-y-4 md:space-y-2" action="#">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User Name
                    </label>
                    <input
                      type="username"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={(e) =>
                        setformData((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="UserName"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setformData((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required="true"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="security"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Security Keyword
                    </label>
                    <input
                      type="text"
                      name="security"
                      id="security"
                      value={formData.security}
                      onChange={(e) =>
                        setformData((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="eg: An01Kl"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) =>
                        setformData((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <label
                      htmlFor="confirm password"
                      className={`${
                        error.passwordmatch.isTrue ? "" : "hidden"
                      } block mb-1 text-sm font-medium text-gray-900 dark:text-red-600`}
                    >
                      Password Do Not Match
                    </label>
                    <input
                      type="password"
                      name="confirmpassword"
                      id="confirmpassword"
                      value={formData.confirmpassword}
                      onChange={(e) =>
                        setformData((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg mb-2 focus:ring-primary-600  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:${
                        error ? "border-red-600" : "border-gray-600"
                      } dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      required=""
                    />
                  </div>
                  <label
                    htmlFor="confirm password"
                    className={`${
                      error.signup.isTrue ? "" : "hidden"
                    } block mb-1 text-sm font-medium text-gray-900 dark:text-red-600`}
                  >
                    {error.signup.error}
                  </label>
                  <label
                    htmlFor="signup error"
                    className={`${
                      error.signup.isTrue ? "" : "hidden"
                    } block mb-1 text-sm font-medium text-gray-900 dark:text-red-600`}
                  >
                    {error.signup.error}
                  </label>

                  <button
                    type="submit"
                    className="w-full text-white bg-rose-600 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handlesubmit}
                  >
                    Sign Up
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      onClick={() => setSignup(false)}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign in
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
