/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount, login, resetCredential } from "../utils/Request";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function LandingPage({ signup, setSignup, setuser, user }) {
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
      error: "",
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

  console.log("error data", error);
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
              signup: { isTrue: true, error: err.response.data.msg },
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
          <Login
            setSignup={setSignup}
            errorState={errorState}
            formData={formData}
            setformData={setformData}
            error={error}
            setError={setError}
            resetpassword={resetpassword}
            setResetpassword={setResetpassword}
            handlesubmit={handlesubmit}
          />
        ) : (
          <SignUp
            setSignup={setSignup}
            errorState={errorState}
            formData={formData}
            setformData={setformData}
            error={error}
            
           
          
            handlesubmit={handlesubmit}
          />
        )}
      </section>
    </>
  );
}
