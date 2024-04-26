import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";
import { categoriesList } from "../../redux/slice/session/category.silce";
import { addProduct } from "../../redux/slice/session/product.slice";

const CreateFood = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [getcategories, setcategories] = useState([]);
  const { categoriesData } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(categoriesList())
      .unwrap()
      .then((categories) => {
        setcategories(categories?.items);
      });
  }, [categoriesData]);

  const [initialData] = useState({
    name: "",
    description: "",
    short_description: "",
    quantity: 0,
    regular_price: 0,
    discounted_price: 0,
    cost_per_item: 0,
    food_item_type: "",
    backorders: "",
    stock_status: "",
    is_jain: false,
    category_id: "",
  });

  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      description: Yup.string().required("Description required"),
      short_description: Yup.string().required("Short Description required"),
      quantity: Yup.number()
        .required("Quantity required")
        .min(0, "Quantity must be greater than or equal to 0"),
      regular_price: Yup.number()
        .required("Regular Price required")
        .min(0, "Price must be greater than or equal to 0"),
      discounted_price: Yup.number().min(
        0,
        "Price must be greater than or equal to 0"
      ),
      cost_per_item: Yup.number()
        .required("Cost per Item required")
        .min(0, "Cost must be greater than or equal to 0"),
      food_item_type: Yup.string().required("Food Item Type required"),
      backorders: Yup.string().required("Backorders required"),
      stock_status: Yup.string().required("Stock Status required"),
      is_jain: Yup.string().required("Is Jain required"),
      category_id: Yup.string().required("Category ID required"),
    }),

    onSubmit: (values) => {
      dispatch(addProduct (values))
        .unwrap()
        .then((data) => {
          if (!data.error) {
            navigate("/foods");
          }
        });
    },
  });

  return (
    <section className="">
      <div className="row justify-content-center align-items-center h-100vh">
        <div className="col-sm-6">
          <div className="login-form">
            <h1 className="text-center mb-3">Create Food</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="mb-3 col-sm-6">
                  <label htmlFor=""> Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <span>{formik.errors.name}</span>
                  )}
                </div>
                <div className="mb-3 col-sm-6">
                  <label htmlFor=""> Short Description</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Short Description"
                    name="short_description"
                    value={formik.values.short_description}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.short_description &&
                    formik.touched.short_description && (
                      <span>{formik.errors.short_description}</span>
                    )}
                </div>
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor=""> Quantity</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Quantity"
                      name="quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.quantity && formik.touched.quantity && (
                      <span>{formik.errors.quantity}</span>
                    )}
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor=""> Regular Price</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Regular Price"
                      name="regular_price"
                      value={formik.values.regular_price}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.regular_price &&
                      formik.touched.regular_price && (
                        <span>{formik.errors.regular_price}</span>
                      )}
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor=""> Discounted Price</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Discounted Price"
                      name="discounted_price"
                      value={formik.values.discounted_price}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.discounted_price &&
                      formik.touched.discounted_price && (
                        <span>{formik.errors.discounted_price}</span>
                      )}
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor=""> Cost per Item</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Cost per Item"
                      name="cost_per_item"
                      value={formik.values.cost_per_item}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.cost_per_item &&
                      formik.touched.cost_per_item && (
                        <span>{formik.errors.cost_per_item}</span>
                      )}
                  </div>
                </div>
                <div className="mb-3 col-sm-4">
                  <label htmlFor=""> Food Item Type</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Food Item Type"
                    name="food_item_type"
                    value={formik.values.food_item_type}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.food_item_type &&
                    formik.touched.food_item_type && (
                      <span>{formik.errors.food_item_type}</span>
                    )}
                </div>
                <div className="mb-3 col-sm-4">
                  <label htmlFor=""> Backorders</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Backorders"
                    name="backorders"
                    value={formik.values.backorders}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.backorders && formik.touched.backorders && (
                    <span>{formik.errors.backorders}</span>
                  )}
                </div>
                <div className="mb-3 col-sm-4">
                  <label htmlFor=""> Stock Status</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Stock Status"
                    name="stock_status"
                    value={formik.values.stock_status}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.stock_status &&
                    formik.touched.stock_status && (
                      <span>{formik.errors.stock_status}</span>
                    )}
                </div>
                <div className="mb-3 col-sm-4">
                  <label htmlFor=""> is_jain</label>
                  <input
                    className="form-control"
                    type="text"
                    name="is_jain"
                    placeholder="is_jain"
                    checked={formik.values.is_jain}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.is_jain && formik.touched.is_jain && (
                    <span>{formik.errors.is_jain}</span>
                  )}
                </div>
                <div className="mb-3 col-sm-4">
                  <label htmlFor="category_id">Category</label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formik.values.category_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    {getcategories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.category_id && formik.touched.category_id && (
                    <span>{formik.errors.category_id}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor=""> Description</label>
                  <textarea
                    placeholder="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    id=""
                    className="form-control"
                  ></textarea>

                  {formik.errors.description && formik.touched.description && (
                    <span>{formik.errors.description}</span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-teal">Create Food</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateFood;
