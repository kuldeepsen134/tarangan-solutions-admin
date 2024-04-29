import React from "react";
import SideBar from "../../Components/SideBar";

const OrderPage = () => {
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
                      {/* {userlistData?.data?.map((user) => (
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
                            //   onClick={() => seteditUser(user?._id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                            //   onClick={() => handleDeleteUser(user?._id)}
                              className="btn btn-danger me-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
