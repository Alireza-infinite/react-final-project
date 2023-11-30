import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

interface User {
  username: string;
  image: string;
  email: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  age?: string;
  city?: string;
}

export interface SessionState {
  token: string | null;
  status: "loggedOut" | "pending" | "loggedIn" | "error";
  user?: User;
}

const initialState: SessionState = {
  token: null,
  status: "loggedOut",
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSession: (state) => {
      state.token = null;
      state.user = undefined;
      state.status = "loggedOut";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.status = "loggedIn";
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
        image: action.payload.image,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        gender: action.payload.gender,
        age: action.payload.age,
        city: action.payload.city,
      };
      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(login.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.status = "loggedIn";
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
        image: action.payload.image,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        gender: action.payload.gender,
        age: action.payload.age,
        city: action.payload.city,
      };
    });
  },
});

// Thunks
export const fetchUserInfo = createAsyncThunk(
  "session/fetchUser",
  async (token: string) => {
    const res = await axios.get("user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data.user;
  },
);

export const login = createAsyncThunk(
  "session/login",
  async (user: { email: string; password: string }) => {
    const res = await axios.post("user/login", { ...user });
    console.log(res);
    return res.data.user;
  },
);

export const signup = createAsyncThunk(
  "session/signup",
  async (user: {
    username: string;
    email: string;
    mobile: string;
    password: string;
  }) => {
    const res = await axios.post("user/signup", { ...user });
    console.log(res);
    return res.data;
  },
);

// Selectors
export const selectSession = (state: RootState) => state.session;
export const selectToken = (state: RootState) => state.session.token;
export const selectUserInfo = (state: RootState) => state.session.user;

// export actions
export const { clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
