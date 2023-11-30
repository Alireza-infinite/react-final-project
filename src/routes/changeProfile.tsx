import { AdjustmentsIcon } from "../app/icons";
import TextInput from "../features/form/TextInput";
import PageHeader from "../features/layout/PageHeader";
import { useState } from "react";
import Sidebar from "../features/layout/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearSession, selectToken } from "../features/session/sessionSlice";
import axios from "axios";

const ChangeProfile = () => {
  const [error, setError] = useState<string>("");
  const token = useAppSelector(selectToken);
  const [sidebarIsShown, setSidebarIsShown] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function changeProfileHandler(profile: {
    firstname: string;
    lastname: string;
    gender: string;
    age: string;
    city: string;
  }) {
    try {
      const { data } = await axios.put(
        "user/change-profile",
        { ...profile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
      navigate("/profile");
    } catch (err) {
      const e = err as any;
      setError(e.response.data.message);
    }
  }

  const toggleSidebar = () => setSidebarIsShown((p) => !p);
  return (
    <>
      <PageHeader>
        <h2>Change Profile</h2>
        <span onClick={toggleSidebar} className="md:hidden">
          <AdjustmentsIcon className="h-6 w-6" />
        </span>
      </PageHeader>

      <div className="md:grid md:grid-cols-4">
        <form
          className="col-span-3 flex h-full w-full flex-col items-center justify-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              firstname: { value: string };
              lastname: { value: string };
              gender: { value: string };
              age: { value: string };
              city: { value: string };
            };

            changeProfileHandler({
              firstname: target.firstname.value,
              lastname: target.lastname.value,
              gender: target.gender.value,
              age: target.age.value,
              city: target.city.value,
            });
          }}
        >
          {error && <p className="text-red-600">{error}</p>}
          <TextInput label="Firstname" type="text" name="firstname" />
          <TextInput label="Lastname" type="text" name="lastname" />
          <TextInput label="Gender" type="text" name="gender" />
          <TextInput label="Age" type="text" name="age" />
          <TextInput label="City" type="text" name="city" />
          <input
            type="submit"
            value="Submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          />
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

export default ChangeProfile;
