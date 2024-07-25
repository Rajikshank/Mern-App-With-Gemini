import React from "react";
import Footer from "./Footer";

export default function Login({
  signup,
  setSignup,
  setuser,
  initial_fields,
  errorState,
  formData,
  setformData,
  error,
  setError,
  resetpassword,
  setResetpassword,
  handlesubmit,
}) {
  return (
    <div className="font-Poppins">
      <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto h-[calc(100vh-74px)]   ]    lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className=" h-8 mr-2" src="./image.png" alt="logo" />
          Todo App
        </a>
        <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-Poppins font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                  {resetpassword ? "New Password" : "Password"}
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
                    className="font-Poppins text-sm font-medium text-slate-400 hover:underline "
                  >
                    Want to Sign in?
                  </a>
                )}

                <div
                  className={`${resetpassword && "hidden"} flex items-start`}
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
                      className="font-Poppins text-gray-500 dark:text-gray-300"
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
                  className={`font-Poppins text-sm font-medium text-slate-400 hover:underline   ${
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
                } block font-Poppins text-sm font-medium text-gray-900 dark:text-red-600`}
              >
                {error.reset.error}
              </label>
              <label
                htmlFor="sign in error"
                className={`${
                  error.login.isTrue ? "" : "hidden"
                } block font-Poppins  text-sm font-medium text-gray-900 dark:text-red-600`}
              >
                {error.login.error}
              </label>

              <button
                type="submit"
                className="w-full text-black font-Poppins bg-cyan-500 hover:bg-cyan-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handlesubmit}
              >
                {resetpassword ? "Reset Password" : "Sign In"}
              </button>
              <p className="text-sm font-light font-Poppins text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  onClick={() => {
                    setSignup(true);
                    setResetpassword(false);
                    setError((prev) => errorState);
                  }}
                  className="font-medium font-Poppins text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
