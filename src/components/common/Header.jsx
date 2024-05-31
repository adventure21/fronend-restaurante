import { IoIosPower } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const cerrarSesion = () => {
    localStorage.clear();
    nav("/");
  };
  return (
    <div className="flex items-center justify-between h-16 bg-gray-100 border-b border-gray-200">
      <div className="flex items-center px-4"></div>
      <div className="flex items-center pr-4">
        <button
          className="ml-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          onClick={cerrarSesion}
        >
          <IoIosPower className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;
