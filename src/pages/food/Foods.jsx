import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userList, userTrush } from "../../redux/slice/session/user.slice";
import { foodList } from "../../redux/slice/session/food.slice";

const Foods = () => {
  const [getFood, setFood] = useState([]);
  const { foodData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(foodList())
      .unwrap()
      .then((foods) => {
        setFood(foods?.items);
        console.log(foods.items);
      });
  }, [foodData]);

  const handleDeleteFood = (foodId) => {
    dispatch(userTrush(foodId))
      .then(() => foodList())
      .unwrap()
      .then((food) => {
        setFood(food?.data);
      });
  };

  const handleEditClick = (userId) => {
    navigate(`/updatefood/${userId}`); // Navigate to UpdateUser with user ID
  };

  return (
    <section>
      <div className="row">
        <div className="col-sm-2 pt-5">
          <SideBar />
        </div>
        <div className="col-sm-10 pt-5 border-start">
          <div className="text-end">
            <Link className="btn btn-success text-white" to="/createfoods">
              Add foods
            </Link>

          </div>
          <h3 className="table-head bg-white p-2 mt-3"> Foods Table</h3>
          <section className="mt-4 boxborder">
            <div className="table-responsive">
              <div className="relative mt-36 ml-4">
                <table className="table ">
                  <thead>
                    <tr className="">
                      <td>name</td>
                      <td>description</td>
                      <td>short_description</td>
                      <td>quantity</td>
                      <td>regular_price</td>
                      <td>discounted_price</td>
                      <td>cost_per_item</td>
                      <td>food_item_type</td>
                      <td>backorders</td>
                      <td>stock_status</td>
                      <td>is_jain</td>
                      <td>category_id</td>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFood.map((food) => (
                      <tr key={food.id} className="">
                        <td>{food?.name}</td>
                        <td>
                          {" "}
                          <span className="lineCount">
                            {" "}
                            {food?.description}
                          </span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span className="lineCount">
                            {food?.short_description}{" "}
                          </span>{" "}
                        </td>
                        <td>{food?.quantity}</td>
                        <td>{food?.regular_price}</td>
                        <td>{food?.discounted_price}</td>
                        <td>{food?.cost_per_item}</td>
                        <td>{food?.food_item_type}</td>
                        <td>{food?.backorders}</td>
                        <td>{food?.stock_status}</td>
                        <td>{food?.is_jain}</td>
                        <td>{food?.category_id}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleEditClick(food?.id)} // Pass user ID
                            className="btn btn-success me-2"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFood(food?.id)}
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
     
    </section>
  );
};

export default Foods;
