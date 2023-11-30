import axios from "axios";
import { useState } from "react";
import TextInput from "../features/form/TextInput";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  async function signupHandler(user: {
    username: string;
    email: string;
    password: string;
    mobile: string;
  }) {
    try {
      const res = await axios.post("user/signup", { ...user });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      const e = err as any;
      setError(e.response.data.message);
    }
  }

  return (
    <form
      className="flex h-full w-full flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          username: { value: string };
          email: { value: string };
          phone: { value: string };
          password: { value: string };
        };
        signupHandler({
          email: target.email.value,
          username: target.username.value,
          mobile: target.phone.value,
          password: target.password.value,
        });
      }}
    >
      {error && <p className="text-red-600">{error}</p>}
      <TextInput label="Username" type="text" name="username" />
      <TextInput label="Email" type="email" name="email" />
      <TextInput label="Phone" type="text" name="phone" />
      <TextInput label="Password" type="text" name="password" />
      <input
        type="submit"
        value="Submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      />
    </form>
  );
};

export default Signup;
