import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userListById, userUpdate } from "../../redux/slice/session/user.slice";

const UpdateFood = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { userlistData } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
  });

  useEffect(() => {
    dispatch(userListById(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    setUserData({
      first_name: userlistData?.first_name || "",
      last_name: userlistData?.last_name || "",
      email: userlistData?.email || "",
      mobile_number: userlistData?.mobile_number || "",
    });
  }, [userlistData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Dispatch the updateUser action with user ID and updated data
    dispatch(
      userUpdate({
        id: params.id,
        userData,
      })
    );
  };

  return (
    <section>
      <div className="row justify-content-center align-items-center h-100vh">
        <div className="col-sm-4 ">
          <div className="login-form">
            <div className=" mb-3">
              <label htmlFor="">first_name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="">last_name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="">mobile_number</label>
              <input
                type="text"
                className="form-control"
                name="mobile_number"
                value={userData.mobile_number}
                onChange={handleChange}
                placeholder="Mobile Number"
              />
            </div>
            <div className=" mb-3">
              <label htmlFor="">email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <button className="btn btn-teal" onClick={handleUpdate}>Update User</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateFood;
