import React, { useState } from 'react';
import { useAuth } from "./context/AuthProvider";
import axios from 'axios'

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { value } = useAuth();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {username, password}
    data['token'] = document.cookie.split(";")[0].split("=")[1]
    console.log(data)
    try {
      const response = await axios.post(
        "https://localhost:8000/login",
        data
      )
      console.log(response)
      if (response.status === 200) {
        console.log(response)
        document.cookie = `token=${response.data}`
        value.onLogin();
      } else {
        setUsername("WRONG USER/PASSWORD");
      }
    } catch (error) {
      setUsername("WRONG USER/PASSWORD");
    }
  };

  const handleRegister = async (e) => {
    console.log("DAWGH")
    e.preventDefault();
    const data = {username, password}
    try {
      const response = await axios.post(
        "https://localhost:8000/users",
        data
      )
      if (response.status === 200) {
        setUsername("REG SUCCESS");
      } else {
        setUsername("REG FAILED");
      }
    } catch (error) {
      setUsername("REG FAILED");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <button onClick={handleRegister}>Register</button>
    </>
  );
};