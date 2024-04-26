import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { useFormik } from "formik";
import { register } from "../../redux/slice/session/user.slice";

const CreateUser = () => {
  const dispatch = useDispatch();

  const [initialData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    password: "",
  });

  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,

    validationSchema: Yup.object({
      first_name: Yup.string().required("First Name required"),
      last_name: Yup.string().required("Last Name required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email required"),
      mobile_number: Yup.string()
        .matches(/^[0-9]+$/, "Invalid mobile number")
        .required("Mobile number required"),
      password: Yup.string()
        .required("Password required")
        .min(6, "Password must be at least 6 characters"),
    }),

    onSubmit: (values) => {
      dispatch(register(values))
        .unwrap()
        .then((data) => {
          if (!data.error) {
            window.location.reload("/users");
          }
        });
    },
  });

  return (
    <section>
      <div className="row justify-content-center align-items-center ">
        <div className="col-sm-12">
          <h1 className="text-center mb-3">Create User</h1>
          <p></p>
          <form onSubmit={formik.handleSubmit}>
            <div className="col-sm-12 mb-3">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
              />
              {formik.errors.first_name && formik.touched.first_name && (
                <span>{formik.errors.first_name}</span>
              )}
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
              />
              {formik.errors.last_name && formik.touched.last_name && (
                <span>{formik.errors.last_name}</span>
              )}
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <span>{formik.errors.email}</span>
              )}
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Mobile Number"
                name="mobile_number"
                value={formik.values.mobile_number}
                onChange={formik.handleChange}
              />
              {formik.errors.mobile_number && formik.touched.mobile_number && (
                <span>{formik.errors.mobile_number}</span>
              )}
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="">Password</label>
              <input
                name="password"
                className="form-control"
                placeholder="Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <span>{formik.errors.password}</span>
              )}
            </div>
            <button type="submit" className="btn btn-teal">
              Create User
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateUser;
