import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { login } from "../../redux/slice/session/session.slice";
import { bgImage } from "../../imgUrl";

const Login = () => {
  const navigate = useNavigate();

  const [initialData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.session);

  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,

    validationSchema: Yup.object({
      email: Yup.string()
        .email("string.emailFormat")
        .required("Email required"),
      password: Yup.string()
        .required("Password required")
        .matches(/^(?=.*)(?=.{6,})/, "string.passwordLength"),
    }),

    onSubmit: (values) => {
      dispatch(login(values))
        .then(() => {
          navigate("/dashboard");
        });
    },
  });
  return (
    <>
      <div className="row align-items-center">
        <div className="col-sm-6">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="login-form">
                <h1>Welcome Back</h1>
                <p>Enter your email and password to sign in</p>

                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <span>{formik.errors.email}</span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Password
                      </label>
                      <input
                        name="password"
                        className="form-control"
                        placeholder="Your Password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <span>{formik.errors.password}</span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      <div className="mb-3 text-end">
                        <Link to="/account-recovery/initiate">
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    <div>
                      <button type="submit" className="btn btn-teal">
                        {loading ? "loading..." : "Signin"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 p-0">
          <div><img src={bgImage} className="img-fluid" alt="" /></div>
        </div>
      </div>
    </>
  );
};

export default Login;
