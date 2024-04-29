import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  userList,
  userListById,
  userTrush,
  userUpdate,
} from "../../redux/slice/session/user.slice";

import { useFormik } from "formik";
import * as Yup from "yup";

const Users = () => {
  const [editUser, seteditUser] = useState("");

  const { userlistData, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();



  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      mobile: "",
      password: "",
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      full_name: Yup.string().required("Full Name required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email required"),
      mobile: Yup.string()
        .matches(/^[0-9]+$/, "Invalid mobile number")
        .required("Mobile number required"),
      password: Yup.string()
        .required("Password required")
        .min(8, "Password must be at least 8 characters"),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(register(values));
      dispatch(userList());
      resetForm();
    },
  });

  const formikUpdateUser = useFormik({
    initialValues: {
      _id: userData?._id || "",
      full_name: userData?.full_name || "",
      email: userData?.email || "",
      mobile: userData?.mobile || "",
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      full_name: Yup.string().required("Full Name required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email required"),
      mobile: Yup.string()
        .matches(/^[0-9]+$/, "Invalid mobile number")
        .required("Mobile number required"),
    }),

    onSubmit: (values) => {
      dispatch(userUpdate(values));
      dispatch(userList());
    },
  });

  const handleDeleteUser = (userId) => {
    dispatch(userTrush(userId));
    dispatch(userList());
  };

  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userListById(editUser));
  }, [dispatch, editUser]);

  return (
    <>
      <section>
        <div className="row">
          <div className="col-sm-2 pt-5">
            <SideBar />
          </div>
          <div className="col-sm-10 pt-5 border-start">
            <div className="text-end">
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn btn-success text-white"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Create Users
              </button>
            </div>
            <h3 className="table-head bg-white p-2 mt-3"> User Table</h3>
            <section className="mt-4 boxborder">
              <div className="table-responsive">
                <div className="relative mt-36 ml-4">
                  <table className="table ">
                    <thead>
                      <tr className="">
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userlistData?.data?.map((user) => (
                        <tr key={user._id} className="">
                          <td>{user?.full_name}</td>
                          <td>{user?.email}</td>
                          <td>{user?.mobile}</td>
                          <td>{user?.role}</td>
                          <td>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#editUserModalLabel"
                              type="button"
                              className="btn btn-success me-2"
                              onClick={() => seteditUser(user?._id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user?._id)}
                              className="btn btn-danger me-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
        <>
          {/*Create New User Modal  */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Create User
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div className="col-sm-12">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="col-sm-12 mb-3">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          name="full_name"
                          value={formik.values.full_name}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.full_name &&
                          formik.touched.full_name && (
                            <span className="text-danger">
                              {formik.errors.full_name}
                            </span>
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
                          <span className="text-danger">
                            {formik.errors.email}
                          </span>
                        )}
                      </div>
                      <div className="col-sm-12 mb-3">
                        <label htmlFor="">Mobile Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Mobile Number"
                          name="mobile"
                          value={formik.values.mobile}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.mobile && formik.touched.mobile && (
                          <span className="text-danger">
                            {formik.errors.mobile}
                          </span>
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
                          <span className="text-danger">
                            {formik.errors.password}
                          </span>
                        )}
                      </div>
                      <button type="submit" className="btn btn-teal">
                        Create User
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Edit user Modal */}
          <div
            className="modal fade"
            id="editUserModalLabel"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="editUserModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editUserModalLabel">
                    Update User
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div className="col-sm-12">
                    <form onSubmit={formikUpdateUser.handleSubmit}>
                      <div className="col-sm-12 mb-3">
                        <label htmlFor="">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          name="full_name"
                          value={formikUpdateUser.values.full_name}
                          onChange={formikUpdateUser.handleChange}
                        />
                        {formikUpdateUser.errors.full_name &&
                          formikUpdateUser.touched.full_name && (
                            <span className="text-danger">
                              {formikUpdateUser.errors.full_name}
                            </span>
                          )}
                      </div>

                      <div className="col-sm-12 mb-3">
                        <label htmlFor="">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={
                            formikUpdateUser.values.email 
                          }
                          onChange={formikUpdateUser.handleChange}
                        />
                        {formikUpdateUser.errors.email &&
                          formikUpdateUser.touched.email && (
                            <span className="text-danger">
                              {formikUpdateUser.errors.email}
                            </span>
                          )}
                      </div>
                      <div className="col-sm-12 mb-3">
                        <label htmlFor="">Mobile Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Mobile Number"
                          name="mobile"
                          value={
                            formikUpdateUser.values.mobile 
                          }
                          onChange={formikUpdateUser.handleChange}
                        />
                        {formikUpdateUser.errors.mobile &&
                          formikUpdateUser.touched.mobile && (
                            <span className="text-danger">
                              {formikUpdateUser.errors.mobile}
                            </span>
                          )}
                      </div>

                      <button type="submit" className="btn btn-teal">
                        Update User
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </section>
    </>
  );
};

export default Users;
