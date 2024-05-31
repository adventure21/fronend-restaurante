import { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import {
  obtenerMenus,
  crearMenu,
  eliminarMenu,
  editarMenu,
} from "../services/menusApi";
import { MdDelete, MdEdit } from "react-icons/md";
import { obtenerPlatos } from "../services/platosApi";
import { Link } from "react-router-dom";
import { BiFoodMenu } from "react-icons/bi";

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [platos, setPlatos] = useState([]);

  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoMenu, setNuevoMenu] = useState({
    nombre: "",
    descripcion: "",
    platos: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatos, setSelectedPlatos] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  useEffect(() => {
    cargarMenus();
    cargarPlatos();
  }, []);

  const cargarMenus = async () => {
    try {
      const response = await obtenerMenus();
      setMenus(response);
    } catch (error) {
      setError(error.message);
    }
  };

  const cargarPlatos = async () => {
    try {
      const response = await obtenerPlatos();
      setPlatos(response);
    } catch (error) {
      setError(error.message);
    }
  };

  const abrirModal = () => {
    setModalIsOpen(true);
  };

  const abrirModalEditar = (data) => {
    setNuevoMenu(data);
    setSelectedPlatos(data.platos);
    console.log(data);

    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
    setNuevoMenu({
      nombre: "",
      descripcion: "",
      platos: [],
    });
  };

  const handleChangeNuevoMenu = (e) => {
    setNuevoMenu({
      ...nuevoMenu,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitNuevoMenu = async (e) => {
    e.preventDefault();
    try {
      const listaIds = selectedPlatos.map((objeto) => objeto._id);
      if (nuevoMenu._id == null) {
        await crearMenu(nuevoMenu.nombre, nuevoMenu.descripcion, listaIds);
      } else {
        console.log("Editando");
        await editarMenu(
          nuevoMenu._id,
          nuevoMenu.nombre,
          nuevoMenu.descripcion,
          platos
        );
      }

      setSelectedPlatos([]);
      cargarMenus();
      cerrarModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEliminarMenu = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este menú?")) {
      try {
        await eliminarMenu(id);
        cargarMenus();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handlePlatoClick = (plato) => {
    if (!selectedPlatos.find((p) => p.id === plato.id)) {
      setSelectedPlatos([...selectedPlatos, plato]);
    }
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSuggestions(term.trim().length > 0);
  };

  const handleRemovePlato = (platoId) => {
    const updatedPlatos = selectedPlatos.filter(
      (plato) => plato.id !== platoId
    );
    setSelectedPlatos(updatedPlatos);
  };

  const filteredPlatos = platos.filter((plato) =>
    plato.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />
        <div className="p-4">
          {error && <p className="text-red-500">Error: {error}</p>}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold animate-slide-in-left">Menús</h1>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none"
              onClick={abrirModal}
            >
              + Nuevo Menú
            </button>
          </div>
          <div className="mt-4">
            {menus.length === 0 && <p>No hay menús disponibles.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menus.map((menu) => (
                <div
                  key={menu._id}
                  className="bg-white shadow-md rounded-lg p-4 mt-4 relative animate-fade-in"
                >
                  <Link
                    to={`/detallemenu/${menu._id}`}
                    className="block w-full "
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-16 h-16 overflow-hidden rounded-full bg-gray-200">
                        <BiFoodMenu className="mx-auto text-4xl mt-3 text-gray-600" />
                      </div>
                      <h2 className="text-xl font-bold mb-2 ml-4">
                        {menu.nombre}
                      </h2>
                    </div>
                    <p className="text-gray-600">{menu.descripcion}</p>
                  </Link>
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-red-500 hover:text-red-600 mr-2 focus:outline-none"
                      onClick={() => handleEliminarMenu(menu._id)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="text-orange-500 hover:text-orange-600 mr-2 focus:outline-none"
                      onClick={() => abrirModalEditar(menu)}
                    >
                      <MdEdit />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar nuevo menú */}
      {modalIsOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">Nuevo Menú</h2>
              <form onSubmit={handleSubmitNuevoMenu}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevoMenu.nombre}
                    onChange={handleChangeNuevoMenu}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={nuevoMenu.descripcion}
                    onChange={handleChangeNuevoMenu}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                    required
                  />
                </div>
                <div className="container mx-auto ">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Platos
                    </label>
                    {/* <input
                      type="text"
                      name="platos"
                      value={selectedPlatos
                        .map((plato) => plato.nombre)
                        .join(", ")}
                      onChange={(e) => e.preventDefault()}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Platos seleccionados..."
                      readOnly
                    /> */}
                  </div>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleInputChange}
                      placeholder="Buscar platos..."
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {showSuggestions && (
                      <div className="absolute bg-white w-full mt-2 py-2 z-50 border rounded-b shadow-lg">
                        {filteredPlatos.map((plato) => (
                          <div
                            key={plato.id}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            onClick={() => handlePlatoClick(plato)}
                          >
                            <p className="text-gray-900 font-medium">
                              {plato.nombre}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {plato.descripcion}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    {selectedPlatos.length != 0 && (
                      <p className="text-gray-700 font-bold mb-2">
                        Platos seleccionados:
                      </p>
                    )}

                    <ul className="border rounded p-2">
                      {selectedPlatos.map((plato, index) => (
                        <li key={index} className="mb-2">
                          <span className="font-medium">{plato.nombre}</span> -{" "}
                          <span className="text-gray-600">
                            {plato.descripcion}
                          </span>
                          <button
                            onClick={() => handleRemovePlato(plato.id)}
                            className="ml-2 text-sm text-red-500 focus:outline-none"
                          >
                            Quitar
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white  text-black hover:bg-gray-300 px-4 py-2 rounded mr-2 focus:outline-none"
                    onClick={cerrarModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none"
                  >
                    {nuevoMenu._id != null ? "Editar Menu" : "Crear Menu"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Menus;
