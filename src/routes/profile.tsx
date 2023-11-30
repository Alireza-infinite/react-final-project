import { useSelector } from "react-redux";
import {
  clearSession,
  fetchUserInfo,
  selectToken,
  selectUserInfo,
} from "../features/session/sessionSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { AdjustmentsIcon, UploadIcon } from "../app/icons";
import { useRef, useState } from "react";
import axios from "axios";
import Sidebar from "../features/layout/Sidebar";
import PageHeader from "../features/layout/PageHeader";

const Profile = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputFile = useRef<HTMLInputElement>(null);

  const [sidebarIsShown, setSidebarIsShown] = useState<boolean>(false);
  const toggleSidebar = () => setSidebarIsShown((p) => !p);

  if (!token) return <div>Error</div>;

  async function uploadProfilePicture(pic: File, token: string) {
    const formData = new FormData();
    formData.append("profile-image", pic);
    await axios.post("user/profile-image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res);
    dispatch(fetchUserInfo(token));
  }

  return (
    <div>
      <PageHeader>
        <h2>Profile</h2>
        <span onClick={toggleSidebar} className="md:hidden">
          <AdjustmentsIcon className="h-6 w-6" />
        </span>
      </PageHeader>
      <div className="md:grid md:grid-cols-4">
        <div className="flex flex-col items-center gap-4 md:col-span-3 md:grow md:flex-row">
          <div className="flex justify-center ">
            <img
              src={user?.image}
              className="h-36 w-36 rounded-md object-cover"
            />
            <div className="group absolute flex h-36 w-36 items-center justify-center rounded bg-gray-800 bg-opacity-0 transition-all duration-300 hover:bg-opacity-70">
              <button
                className="flex items-center gap-1 text-xs text-white opacity-0 group-hover:opacity-100"
                onClick={() => inputFile.current?.click()}
              >
                <span>
                  <UploadIcon className="h-5 w-5" />
                </span>
                <span>Change Picture</span>
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl">{user?.username}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <div>
              <p>{user?.firstname}</p>
              <p>{user?.lastname}</p>
              <p>{user?.age}</p>
              <p>{user?.gender}</p>
              <p>{user?.city}</p>
            </div>
          </div>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/png, image/jpeg"
            className="hidden"
            ref={inputFile}
            onChange={(e) => {
              if (e.target.files)
                uploadProfilePicture(e.target.files[0], token);
            }}
          />
        </div>
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
    </div>
  );
};

export default Profile;
