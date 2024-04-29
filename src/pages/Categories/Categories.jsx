import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  categoriesList,
  categoriesListById,
  categoriesTrush,
} from "../../redux/slice/session/category.silce";
import * as Yup from "yup";
import { useFormik } from "formik";

const Categories = () => {
  const [editCategory, seteditCategory] = useState("");

  const { categorieslistData, categoryData } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesList());
  }, [dispatch]);

  const handleDeleteCategories = (categoryId) => {
    dispatch(categoriesTrush(categoryId));
    dispatch(categoriesList());
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      parentCategoryID: "",
      subcategories: [],
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      description: Yup.string().required("Description required"),
    }),

    onSubmit: (values) => {
      dispatch(addCategories(values));
      dispatch(categoriesList());
    },
  });

  const formikEditCategory = useFormik({
    initialValues: {
      name: categoryData.name || "",
      description: categoryData.description || "",
      parentCategoryID: categoryData.parentCategoryID || "",
      subcategories: [],
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      description: Yup.string().required("Description required"),
    }),

    onSubmit: (values) => {
      dispatch(addCategories(values));
      dispatch(categoriesList());
    },
  });

  useEffect(() => {
    dispatch(categoriesListById(editCategory));
  }, [dispatch, editCategory]);
  return (
    <>
      <section>
        <div className="row">
          <div className="col-sm-2 pt-5">
            <SideBar />
          </div>
          <div className="col-sm-10 pt-5 border-start">
            <div className="text-end">
              <button
                type="button"
                className="btn btn-success text-white"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add categories
              </button>
            </div>
            <h3 className="table-head bg-white p-2 mt-3"> Categories Table</h3>
            <section className="mt-4 boxborder">
              <div className="table-responsive">
                <div className="relative mt-36 ml-4">
                  <table className="table">
                    <thead>
                      <tr>
                        {/* <th>ID</th> */}
                        <th>Name</th>
                        <th>Description</th>
                        <th>Parent category</th>
                        <th>Sub category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorieslistData?.data?.map((category) => (
                        <tr key={category._id}>
                          {/* <td>{category._id}</td> */}
                          <td>{category.name}</td>
                          <td>{category.description}</td>
                          <td>{category?.parentCategoryID?.name}</td>
                          <td>{category?.subCategoriesID[0]?.name}</td>

                          <td>
                            <button
                              className="btn btn-success text-white"
                              data-bs-toggle="modal"
                              data-bs-target="#editCategory"
                              onClick={() => seteditCategory(category?._id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteCategories(category._id)
                              }
                              className="btn btn-danger"
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
          {/* Modal */}
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
                    Add Category
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
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
                      {formik.errors.description &&
                        formik.touched.description && (
                          <span>{formik.errors.description}</span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dropdownMenuButton1">
                        Parent Category
                      </label>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Dropdown button
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          {categorieslistData?.data?.map((category, index) => (
                            <li key={index}>
                              <button
                                type="button"
                                className="dropdown-item"
                                onClick={() =>
                                  formik.setFieldValue(
                                    "parentCategoryID",
                                    category._id
                                  )
                                }
                              >
                                {category.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-teal">
                      Add Category
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/*Edit category Modal */}
          <div
            className="modal fade"
            id="editCategory"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="editCategoryLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editCategoryLabel">
                    Edit Category
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={formikEditCategory.handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={formikEditCategory.values.name}
                        onChange={formikEditCategory.handleChange}
                      />
                      {formikEditCategory.errors.name &&
                        formikEditCategory.touched.name && (
                          <span>{formikEditCategory.errors.name}</span>
                        )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="">Description</label>
                      <textarea
                        placeholder="Description"
                        className="form-control"
                        name="description"
                        value={formikEditCategory.values.description}
                        onChange={formikEditCategory.handleChange}
                      />
                      {formikEditCategory.errors.description &&
                        formikEditCategory.touched.description && (
                          <span>{formikEditCategory.errors.description}</span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dropdownMenuButton1">
                        Parent Category
                      </label>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Dropdown button
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          {categorieslistData?.data?.map((category, index) => (
                            <li key={index}>
                              <button
                                type="button"
                                className="dropdown-item"
                                onClick={() =>
                                  formikEditCategory.setFieldValue(
                                    "parentCategoryID",
                                    category._id
                                  )
                                }
                              >
                                {category.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-teal">
                      Add Category
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      </section>
    </>
  );
};

export default Categories;
