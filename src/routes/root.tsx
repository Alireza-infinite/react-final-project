import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearSession, selectSession } from "../features/session/sessionSlice";
import { useState } from "react";
import { selectCartItemsCount } from "../features/cart/cartSlice";

const Root = () => {
  const session = useAppSelector(selectSession);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const [dropDownShown, setDropDownShown] = useState<boolean>(false);

  return (
    <div className="flex h-screen flex-col dark:bg-gray-950 dark:text-white">
      <nav className="sticky top-0 flex items-center justify-between border-b border-neutral-700 px-2 py-2 dark:border-gray-200 dark:bg-gray-950">
        <Link to="/">Home</Link>
        <Link to="cart" className="relative">
          Cart
          <span className="absolute top-2 h-5 w-5 rounded-full bg-red-500 text-center text-sm font-medium text-white">
            {cartItemsCount}
          </span>
        </Link>
        <div>
          {session.user ? (
            <span
              className="relative inline-block text-center"
              onClick={() => setDropDownShown((p) => !p)}
            >
              <img src={session.user.image} className="h-8 w-8 rounded-full" />
              <div
                className={`absolute -left-16 z-10 flex flex-col rounded bg-gray-50 px-4 py-2 shadow dark:bg-gray-800 ${
                  !dropDownShown ? "hidden" : ""
                }`}
              >
                <Link to="/profile">Profile</Link>
                <Link to="/orders">Orders</Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    dispatch(clearSession());
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </span>
          ) : (
            <Link to={"login"}>Login</Link>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Root;
