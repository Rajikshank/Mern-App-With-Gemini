/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { edituser, getuser } from "../utils/Request";

import Spinner from "../utils/Spinner";
import SuccessAnimation from "../utils/Success";

export default function AccountEditForm({ setEdit, setuser }) {
  const [formData, setformData] = useState(null);

  useEffect(() => {
    getuser().then((user) => {
      console.log("from edit", user);
      setformData((prev) => ({
        email: user.email,
        username: user.username,
        confirmpassword: "",
        password: "",
        security: user.security,
      }));
    });
  }, []);

  const [Success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //console.log(formData);
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("changed formdata", formData);

    edituser({
      email: formData.email,
      username: formData.username,
      password: formData.password,
      security: formData.security,
    })
      .then((value) => {
        console.log(value);
        setuser(value);
      })
      .catch((err) => console.log(err));
    setformData(null);
    setSuccess(true);
    setTimeout(() => setEdit(false), 1500);
  };

  return (
    <>
      {!formData && (
        <div className="flex items-center flex-col p-4 ">
          {!Success && <Spinner />}
          {Success && <SuccessAnimation />}
        </div>
      )}

      {formData && (
        <div className="flex flex-col items-center  w-full mt-2">
          <div className="w-full  rounded-lg  shadow dark:border md:mt-4 sm:mt-4 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-6 md:space-y-6 sm:p-5  ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit your account
              </h1>
              <form className="" action="#" onSubmit={handlesubmit}>
                <div>
                  <label
                    for="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
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
                    required="true"
                  />
                </div>
                <div>
                  <label
                    for="email"
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
                    for="security"
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
                    required="true"
                  />
                </div>
                <div>
                  <label
                    for="password"
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
                    required="true"
                  />
                </div>
                <div>
                  <label
                    for="confirm password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <label
                    for="confirm password"
                    className={`${
                      error ? "" : "hidden"
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
                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:${
                      error ? "border-red-600" : "border-gray-600"
                    } dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required="true"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-rose-600 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-primary-300 mt-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
