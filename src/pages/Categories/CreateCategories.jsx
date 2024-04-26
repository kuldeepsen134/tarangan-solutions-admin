import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addCategories } from "../../redux/slice/session/category.silce";

const CreateCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialData] = useState({
    name: "",
    description: "",
  });

  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      description: Yup.string().required("Description required"),
    }),

    onSubmit: (values) => {
      dispatch(addCategories(values))
        .unwrap()
        .then((data) => {
          if (!data.error) {
            navigate("/categories");
          }
        });
    },
  });

  return (
    <section>
      <div className="row justify-content-center align-items-center h-100vh">
        <div className="col-sm-3">
          <div className="login-form">
            <h1>Add Category</h1>
            <p>Enter your details to register</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <span>{formik.errors.name}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="">Description</label>
                <textarea
                  placeholder="Description"
                  className="form-control"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && formik.touched.description && (
                  <span>{formik.errors.description}</span>
                )}
              </div>
              <button type="submit" className="btn btn-teal">Add Category</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCategories;
