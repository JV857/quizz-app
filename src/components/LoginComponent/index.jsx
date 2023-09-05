import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../../assets/config";

const LoginComponent = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerTwo,
    reset: resetTwo,
    formState: { errors: errorsTwo },
    handleSubmit: handleSubmitTwo,
  } = useForm();

  const getUserData = () => {
    onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    });
  };

  const onSubmit = async (data) => {
    // Login
    await signInWithEmailAndPassword(auth, data.email_id, data.password)
      .then((res) => {
        if (res) {
          if (res?.operationType === "signIn") {
            toast.success("Signin Successful");
            getUserData();
            reset();
            navigate("/start");
          }
        }
      })
      .catch((error) => {
        const errorObj = JSON.parse(JSON.stringify(error));
        if (errorObj.code === "auth/wrong-password") {
          toast.error("Wrong Password");
        } else if (errorObj.code === "auth/too-many-requests") {
          toast.error("Too many requests, please try again after some time");
        }
      });
  };

  const onSubmitTwo = async (data) => {
    // Register
    await createUserWithEmailAndPassword(auth, data.email_id, data.password)
      .then((res) => {
        if (res) {
          if (res?.operationType === "signIn") {
            toast.success("Registration Successful");
            getUserData();
            resetTwo();
            navigate("/start");
          }
        }
      })
      .catch((error) => {
        const errorObj = JSON.parse(JSON.stringify(error));
        if (errorObj.code === "auth/email-already-in-use") {
          toast.error("Email already in use, Please Login");
        }
      });
  };

  return (
    <>
      {isLoggedIn && (
        <div className="signin_form_wrapper">
          <form onSubmit={handleSubmit(onSubmit)} className="signin_form py-3">
            <h4 className="register_login_heading py-3">
              Login With Your Registered Email
            </h4>
            <div className="input_fields">
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="email_id">
                  Email <span className="requiredColor">*</span>
                </label>
                <input
                  {...register("email_id", {
                    required: true,
                    pattern: /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|test|testing)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/,
                    maxLength: 120,
                  })}
                  autoComplete="new-password"
                  className="form-control"
                />
                {errors.email_id?.type === "required" && (
                  <span className="error_validation mb-2">
                    This field is required.
                  </span>
                )}
                {errors.email_id && errors.email_id.type === "pattern" && (
                  <span className="error_validation mb-2">
                    Please enter valid email
                  </span>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label" htmlFor="password">
                  Password <span className="requiredColor">*</span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    maxLength: 120,
                  })}
                  autoComplete="new-password"
                  className="form-control"
                />
                <span className="error_validation">
                  {errors.password?.type === "required" &&
                    "This field is required."}
                  {errors.password?.message}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                reset();
                setIsLoggedIn(false);
              }}
              className="login_register_btn mb-2"
            >
              <b>Register Here</b>
            </button>
            <input type="submit" className="submit_btn btn btn-primary mt-2 mb-2" />
          </form>
        </div>
      )}
      {!isLoggedIn && (
        <div className="register_form_wrapper">
          <form
            onSubmit={handleSubmitTwo(onSubmitTwo)}
            className="signin_form py-3"
          >
            <h4 className="register_login_heading py-3">
              Register With Your Email
            </h4>
            <div className="input_fields">
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="email_id">
                  Email <span className="requiredColor">*</span>
                </label>
                <input
                  {...registerTwo("email_id", {
                    required: true,
                    pattern: /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|test|testing)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/,
                    maxLength: 120,
                  })}
                  autoComplete="new-password"
                  className="form-control"
                />
                {errorsTwo.email_id?.type === "required" && (
                  <span className="error_validation mb-2">
                    This field is required.
                  </span>
                )}
                {errorsTwo.email_id &&
                  errorsTwo.email_id.type === "pattern" && (
                    <span className="error_validation mb-2">
                      Please enter valid email
                    </span>
                  )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label" htmlFor="password">
                  Password <span className="requiredColor">*</span>
                </label>
                <input
                  {...registerTwo("password", {
                    required: true,
                    maxLength: 120,
                  })}
                  autoComplete="new-password"
                  className="form-control"
                />
                <span className="error_validation">
                  {errorsTwo.password?.type === "required" &&
                    "This field is required."}
                  {errorsTwo.password?.message}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                resetTwo();
                setIsLoggedIn(true);
              }}
              className="login_register_btn mb-2"
            >
              <b>Login Here</b>
            </button>
            <input type="submit" className="submit_btn btn btn-primary mt-2 mb-2" />
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default LoginComponent;
