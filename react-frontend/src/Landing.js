import React, { useState, useEffect } from "react";
import axios from "axios"
import { useAuth } from "./context/AuthProvider";

export const Landing = () => {
  const { value } = useAuth();
  const [users, setUsers] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const google_token = queryParameters.get("token");

  if (google_token) {
    console.log("ITS HERE")

    if (google_token) localStorage.setItem("TOKEN_KEY", google_token);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
      	const data = {"token" : document.cookie.split(";")[0].split("=")[1]}
        const response = await axios.post(
        "https://localhost:8000/users/all",
        data)
        console.log(response)
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [value.token]);

  return (
    <>
      <h2>Landing (Protected)</h2>
      <div>Authenticated as {value.token}</div>

      <h3>User Catalog</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
};