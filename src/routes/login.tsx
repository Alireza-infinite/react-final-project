import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import TextInput from "../features/form/TextInput";
import { fetchUserInfo, selectSession } from "../features/session/sessionSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  async function loginHandler(user: { email: string; password: string }) {
    try {
      const res = await axios.post("user/login", { ...user });
      const token = res.data.user.token;
      localStorage.setItem("token", res.data.user.token);
      dispatch(fetchUserInfo(token));
      navigate("/");
    } catch (err) {
      const e = err as any;
      setError(e.response.data.message);
    }
  }

  useEffect(() => {
    if (session.status === "loggedIn") navigate("/");
  }, [session]);

  return (
    <form
      className="flex h-full w-full flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          username: { value: string };
          password: { value: string };
        };
        loginHandler({
          email: target.username.value,
          password: target.password.value,
        });
      }}
    >
      {error && <p className="text-red-600">{error}</p>}
      {session.status === "error" && (
        <p className="text-red-600">Wrong username or password</p>
      )}
      <TextInput type="text" name="username" label="Username" />
      <TextInput type="password" name="password" label="Password" />
      <input
        type="submit"
        value="Login"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      />
      <Link to="/signup" className="text-blue-700 hover:underline">
        Signup
      </Link>
    </form>
  );
};

export default Login;
