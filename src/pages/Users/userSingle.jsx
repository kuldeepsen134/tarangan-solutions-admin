import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userListById } from "../../redux/slice/session/user.slice";

const UserSingle = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { userlistData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userListById(`${params.id}`));
  }, []);

  return (
    <>
    <section>
      <div className="row justify-content-center align-items-center h-100vh">
        <div className="col-sm-5">
          <div className="login-form">
            <ul className="user-profile-card">
              <li> <b> id: </b> {userlistData?.id} </li>
              <li> <b> first_name: </b> {userlistData?.first_name} </li>
              <li> <b> last_name: </b> {userlistData?.last_name} </li>
              <li> <b> mobile_number: </b> {userlistData?.mobile_number} </li>
              <li> <b> email: </b> {userlistData?.email} </li>
              <li> <b> status: </b> {userlistData?.status} </li>
              <li> <b> password: </b> {userlistData?.password} </li>
              <li> <b> role: </b> {userlistData?.role} </li>
              <li> <b> token: </b> {userlistData?.token} </li>
              <li> <b> created_at: </b> {userlistData?.created_at} </li>
              <li> <b> updated_at: </b> {userlistData?.updated_at} </li>
              <li> <b> message: </b> {userlistData?.message} </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default UserSingle;
