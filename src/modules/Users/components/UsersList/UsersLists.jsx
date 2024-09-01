import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import baseUsersAuth from "../../../BaseUrls/BaseUrls";

export default function UsersLists() {
  const [UsersList, setUsersList] = useState([]);
  const [nameValue, setNameValue] = useState("");

  let navigate = useNavigate();

  let getUsers = async ( pageNo = 1, pageSize = 2, nameInput = "" ) => {
    try {
      let response = await axios.get(baseUsersAuth.GetUsersURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params:{
          pageNumber: pageNo, 
          pageSize: pageSize, 
          userName: nameInput}
      });
      setUsersList(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  let ToggleUsersStautes = async (id, isActivated ) => {
    try {
      let response = await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Users/${id}`,
        {
          isActivated: !isActivated,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      setUsersList((prevUsersList) =>
        prevUsersList.map((user) =>
          user.id === id ? { ...user, isActivated: !isActivated } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getUsers(1, 2, input.target.value);
  };

  useEffect(() => {
    getUsers(1,4);
  }, []);

  return (
    <>
      <h2 className="mx-2 my-4 text-black-50"> Users </h2>

        <div class="wrap-input-6 w-25">
          <input role="search" onChange={getNameValue} className="input" type="text" placeholder=" Search By Name"/>
          <span class="focus-border"></span>
        </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">UserName</th>
            <th scope="col">Status</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {UsersList.length > 0
            ? UsersList.map((Users) => (
                <tr key={Users.id}>
                  <td>{Users.userName}</td>
                  <td>
                    {Users.isActivated ? (
                      <button className="btn-77 my-3">Active</button>
                    ) : (
                      <button className="btn btn-danger my-4 w-50">Not Active</button>
                    )}
                  </td>
                  <td>{Users.phoneNumber}</td>
                  <td>{Users.email}</td>
                  <td>{Users.country}</td>
                  <td>
                    <div className="wrap-check-19">
                      <input
                        type="checkbox"
                        checked={Users.isActivated}
                        onChange={() =>
                          ToggleUsersStautes(Users.id, Users.isActivated)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </>
  );
}
