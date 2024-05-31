import { IoMenuOutline } from "react-icons/io5";
import {
  HiOutlineDocumentText,
  HiOutlineViewGrid,
  HiOutlineUsers,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-[#012d75]">
      <div className="flex items-center justify-center h-16 bg-[#102e5e]">
        <span className="text-white font-bold uppercase">RESTAURANTE</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-[#012d75]">
          <Link
            to="/menus"
            className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
          >
            <IoMenuOutline className="h-6 w-6 mr-2" />
            <span className="truncate">Menús</span>
          </Link>
          <Link
            to="/platos"
            className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
          >
            <HiOutlineDocumentText className="h-6 w-6 mr-2" />
            <span className="truncate">Platos</span>
          </Link>
          <Link
            to="/categorias"
            className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
          >
            <HiOutlineViewGrid className="h-6 w-6 mr-2" />
            <span className="truncate">Categorías</span>
          </Link>
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
          >
            <HiOutlineUsers className="h-6 w-6 mr-2" />
            <span className="truncate">Usuarios</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
