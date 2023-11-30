import { XIcon } from "../../app/icons";

type Props = {
  isShown: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode;
};

const Sidebar = ({ isShown, toggleSidebar, children }: Props) => {
  return (
    <div
      className={`fixed top-0 z-30 flex h-screen w-full flex-col items-center gap-5 bg-white px-8 pt-6 transition-all dark:bg-gray-900 ${
        isShown ? "right-0" : "-right-full"
      }
      md:static md:h-fit md:w-full md:items-start md:rounded md:border md:border-gray-200 md:bg-gray-50 md:py-10 md:dark:bg-gray-900`}
    >
      <button className="self-end md:hidden" onClick={toggleSidebar}>
        <XIcon className="h-6 w-6" />
      </button>
      {children}
    </div>
  );
};

export default Sidebar;
