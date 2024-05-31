import { useState } from "react";
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { login } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = await login(email, password);
      if (!success) {
        setError(message);
      } else {
        console.log(message);
        navigation("/");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Iniciar sesión</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <IoIosEyeOff
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                  size={20}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoMdEye
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                  size={20}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="mt-6 items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">O</p>
            <hr className="border-gray-300" />
          </div>

          <div className="mt-4 text-sm flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0">Si no tienes una cuenta</p>
            <Link
              className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
              to="/register"
            >
              Regístrate
            </Link>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://img.freepik.com/foto-gratis/disparo-vertical-porcion-plato-mariscos-mesa-cocina-restaurante_181624-58968.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1716422400&semt=ais_user"
            alt="Formulario de inicio de sesión"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
