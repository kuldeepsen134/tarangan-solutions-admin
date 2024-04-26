import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoriesList, categoriesTrush} from "../../redux/slice/session/category.silce";

const Categories = () => {

  const [categories, setCategories] = useState([]);
  const { categoriesData } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesList())
      .unwrap()
      .then((categories) => {
        setCategories(categories?.items);
        console.log(categories.items);
      });
  }, [categoriesData, dispatch]);

  const handleDeleteCategories = (categoryId) => {
    dispatch(categoriesTrush(categoryId))
      .then(() => {
        dispatch(categoriesList())
          .then((response) => {
            setCategories(response.payload.items);
          })
          .catch((error) => {
            // Handle error
            console.error("Error fetching categories after deletion:", error);
          });
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting categories:", error);
      });
  };

  return (
    <>
      <section>
        <div className="row">
          <div className="col-sm-2 pt-5">
            <SideBar />
          </div>
          <div className="col-sm-10 pt-5 border-start">
            <div className="text-end">
              <Link
                className="btn btn-success text-white"
                to="/createcategories"
              >
                Add categories
              </Link>
            </div>
            <h3 className="table-head bg-white p-2 mt-3"> Categories Table</h3>
            <section className="mt-4 boxborder">
              <div className="table-responsive">
                <div className="relative mt-36 ml-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>{category.description}</td>
                          <td>
                            <Link
                              className="btn btn-success text-white me-3"
                              to={`/updatecategories/${category.id}`}
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteCategories(category.id)
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

            {/* ------------------- */}
          </div>
        </div>
      </section>


     
    </>
  );
};

export default Categories;
