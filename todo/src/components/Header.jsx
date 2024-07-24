import { FaSignOutAlt } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { deleteuser, logout } from "../utils/Request";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

export default function Header({
  edit,
  currentuser,
  toggleaccountedit,
  completed,
}) {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-800 w-screen shadow-md flex flex-col items-center">
      <header className="  text-white p-4 text-center ">
        <h1 className="text-2xl font-bold">
          Hi
          {currentuser.username
            ? " " + currentuser.username.toUpperCase() + " "
            : "There"}
          !!!
        </h1>
        <h1 className="mt-1 text-slate-400">You have Completed {completed} Task{completed>1&&'s'}</h1>
      </header>
     
      <div className="flex gap-5 items-center justify-center">
        <button
          className="flex items-center gap-1 text-slate-500 hover:text-slate-200  hover:animate-pulse"
          onClick={() => logout(navigate)}
        >
          {" "}
          <FaSignOutAlt /> <label>Logout</label>
        </button>
        <button
          className="flex items-center gap-1 text-slate-500 hover:text-gray-200 hover:animate-pulse"
          onClick={() => edit((prev) => !prev)}
        >
          {" "}
          {!toggleaccountedit ? <FaUserEdit /> : <MdSpaceDashboard />}{" "}
          {!toggleaccountedit ? "Edit Account" : "Dashboard"}
        </button>
        <button
          className="flex items-center gap-1 text-slate-500 hover:text-red-500 hover:animate-pulse"
          onClick={() => deleteuser(navigate)}
        >
          {" "}
          <AiOutlineUserDelete /> Destroy Account
        </button>
      </div>
    </div>
  );
}
