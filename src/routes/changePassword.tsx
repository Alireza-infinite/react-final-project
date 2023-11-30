import { AdjustmentsIcon } from "../app/icons";
import TextInput from "../features/form/TextInput";
import PageHeader from "../features/layout/PageHeader";
import { useState } from "react";
import Sidebar from "../features/layout/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearSession, selectToken } from "../features/session/sessionSlice";
import axios from "axios";

const ChangePassword = () => {
  const [sidebarIsShown, setSidebarIsShown] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const token = useAppSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function changePass(crntPassword: string, newPassword: string) {
    if (!crntPassword.trim() || !newPassword.trim()) {
      setError("Password can't be empty");
      return;
    }

    try {
      const { data } = await axios.put(
        "user/change-password",
        {
          old_password: crntPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
    } catch (err) {
      const e = err as any;
      setError(e.response.data.message);
    }
  }

  const toggleSidebar = () => setSidebarIsShown((p) => !p);
  return (
    <>
      <PageHeader>
        <h2>Change Password</h2>
        <span onClick={toggleSidebar} className="md:hidden">
          <AdjustmentsIcon className="h-6 w-6" />
        </span>
      </PageHeader>

      <div className="md:grid md:grid-cols-4">
        <form
          className="col-span-3 flex flex-col gap-4 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              crntPassword: { value: string };
              newPassword: { value: string };
            };
            changePass(target.crntPassword.value, target.newPassword.value);
          }}
        >
          {error && <p className="text-red-600">{error}</p>}
          <TextInput
            type="password"
            label="Current Password"
            name="crntPassword"
          />
          <TextInput type="password" label="New Password" name="newPassword" />
          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            />
          </div>
        </form>
        <div className="md:col-span-1">
          <Sidebar isShown={sidebarIsShown} toggleSidebar={toggleSidebar}>
            <Link to="/profile" className="text-blue-600">
              Profile
            </Link>
            <Link to="/change-profile" className="text-blue-600">
              Change Profile
            </Link>
            <Link to="/change-password" className="text-blue-600">
              Change Password
            </Link>
            <button
              className=" text-red-500"
              onClick={() => {
                localStorage.clear();
                dispatch(clearSession());
                navigate("/");
              }}
            >
              Logout
            </button>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
