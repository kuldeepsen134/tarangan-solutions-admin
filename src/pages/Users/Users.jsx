import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userList, userTrush } from "../../redux/slice/session/user.slice";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  useEffect(() => {
    fetchUsers();
  }, [userData, dispatch]);

  const fetchUsers = () => {
    dispatch(userList())
      .then((response) => {
        setUsers(response.payload.items);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    dispatch(userTrush(userId))
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    fetchUsers(); // Fetch the updated user list after the modal is closed
    
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
              <Link className="btn btn-success text-white" to="/createusers">
              Add Users
            </Link>
            </div>
            <h3 className="table-head bg-white p-2 mt-3"> User Table</h3>
            <section className="mt-4 boxborder">
              <div className="table-responsive">
                <div className="relative mt-36 ml-4">
                  <table className="table ">
                    <thead>
                      <tr className="">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user) => (
                        <tr key={user.id} className="">
                          <td>{user?.first_name}</td>
                          <td>{user?.last_name}</td>
                          <td>{user?.email}</td>
                          <td>{user?.mobile_number}</td>
                          <td>{user?.role}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleEditClick(user?.id)} // Pass user ID
                              className="btn btn-success me-2"
                            >
                              Edit
                            </button>
                            <UpdateUser
                              isOpen={isUpdateModalOpen}
                              onClose={handleCloseModal}
                              userId={selectedUserId}
                            />
                            {/* <button
                              type="button"
                              onClick={() => handleInfoClick(user?.id)} // Pass user ID
                              className="btn btn-info me-2"
                            >
                              Info
                            </button> */}
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user?.id)}
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
      <CreateUser />
    </>
  );
};

export default Users;
