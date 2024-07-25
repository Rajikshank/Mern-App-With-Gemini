import React from "react";
import Footer from "./Footer";

export default function SignUp({
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
    <div className=""> 
    <div className="flex flex-col items-center flex-shrink-0 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
            Sign up for a new account
          </h1>
          <form className="space-y-4 md:space-y-2" action="#">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 font-Poppins text-sm font-medium text-gray-900 dark:text-white"
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
                className="block mb-2 font-Poppins text-sm font-medium text-gray-900 dark:text-white"
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
                className="block mb-2 font-Poppins text-sm font-medium text-gray-900 dark:text-white"
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
                className="block mb-2 font-Poppins text-sm font-medium text-gray-900 dark:text-white"
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
                className="block mb-2 font-Poppins text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <label
                htmlFor="confirm password"
                className={`${
                  error.passwordmatch.isTrue ? "" : "hidden"
                } block mb-1 font-Poppins text-sm font-medium text-gray-900 dark:text-red-600`}
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
              htmlFor="signup error"
              className={`${
                error.signup.isTrue ? "" : "hidden"
              } block mb-1 font-Poppins text-sm font-medium text-gray-900 dark:text-red-600`}
            >
              {error.signup.error}
            </label>

            <button
              type="submit"
              className="w-full font-Poppins text-black bg-cyan-500 hover:bg-cyan-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={handlesubmit}
            >
              Sign Up
            </button>
            <p className="text-sm font-Poppins font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => setSignup(false)}
                className="font-medium font-Poppins text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
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
