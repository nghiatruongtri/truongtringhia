import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const localhost: 8080 =
//   process.env.NODE_ENV !== "production"
//     ? "http://127.0.0.1:5000"
//     : import.meta.env.VITE_SERVER_URL;

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email, password);
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      };

      const { data } = await axios.post(
        `http://localhost:8080/users/login`,
        { email, password },
        config,
      );

      // store user's token in local storage
      localStorage.setItem("userToken", data.token);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `http://localhost:8080/users/register`,
        { name, email, password },
        config,
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
