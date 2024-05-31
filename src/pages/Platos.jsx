/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import {
  crearPlato,
  eliminarPlato,
  editarPlato,
  obtenerPlatos,
} from "../services/platosApi";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

import { obtenerCategorias } from "../services/categoriasApi";

const Platos = () => {
  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoPlato, setNuevoPlato] = useState({
    nombre: "",
    ingredientes: "",
    descripcion: "",
    precio: 0,
    categoria: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    cargarPlatos();
    cargarCategorias();
  }, []);

  const handleChangeCategoria = (event) => {
    const categoriaSeleccionada = categorias.find(
      (categoria) => categoria._id === event.target.value
    );
    setCategoriaSeleccionada(categoriaSeleccionada);
  };

  const cargarPlatos = async () => {
    try {
      const response = await obtenerPlatos();
      console.log(response);
      setPlatos(response);
    } catch (error) {
      setError(error.message);
    }
  };
  const cargarCategorias = async () => {
    try {
      const response = await obtenerCategorias();
      console.log(response);
      setCategorias(response);
    } catch (error) {
      setError(error.message);
    }
  };

  const abrirModal = () => {
    setModalIsOpen(true);
  };

  const abrirModalEditar = (plato) => {
    setNuevoPlato({
      ...plato,
      ingredientes: plato.ingredientes.join(", "),
    });
    console.log(plato);
    setCategoriaSeleccionada(plato.categoria);
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
    setNuevoPlato({
      nombre: "",
      ingredientes: "",
      descripcion: "",
      precio: 0,
      categoria: "",
    });
  };

  const handleChangeNuevoPlato = (e) => {
    setNuevoPlato({
      ...nuevoPlato,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitNuevoPlato = async (e) => {
    e.preventDefault();
    try {
      const ingredientesArray = nuevoPlato.ingredientes
        .split(",")
        .map((ingrediente) => ingrediente.trim());

      if (!nuevoPlato._id) {
        console.log(nuevoPlato);
        console.log(categoriaSeleccionada);
        await crearPlato(
          nuevoPlato.nombre,
          ingredientesArray,
          nuevoPlato.descripcion,
          nuevoPlato.precio,
          categoriaSeleccionada._id
        );
      } else {
        await editarPlato(
          nuevoPlato._id,
          nuevoPlato.nombre,
          ingredientesArray,
          nuevoPlato.descripcion,
          nuevoPlato.precio,
          categoriaSeleccionada._id
            ? categoriaSeleccionada._id
            : categoriaSeleccionada.id
        );
      }
      cerrarModal();
      cargarPlatos();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEliminarPlato = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este plato?")) {
      try {
        await eliminarPlato(id);
        cargarPlatos();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleEditPlato = (plato) => {
    abrirModalEditar(plato);
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
            <h1 className="text-2xl font-bold animate-slide-in-left">Platos</h1>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none"
              onClick={abrirModal}
            >
              + Nuevo Plato
            </button>
          </div>
          <div className="mt-4">
            {platos.length === 0 && <p>Cargando platos...</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPlatos.map((plato) => (
                <div
                  key={plato._id}
                  className="bg-white shadow-md rounded-lg p-4 mt-4 relative animate-fade-in"
                >
                  <div className="block w-full ">
                    <div className="flex justify-between items-center">
                      <div className="w-16 h-16 overflow-hidden rounded-full bg-gray-200">
                        <BiSolidDish className="mx-auto text-4xl mt-3 text-gray-600" />
                      </div>
                      <h2 className="text-xl font-bold mb-2 ml-4">
                        {plato.nombre}
                      </h2>
                    </div>
                    <p className="text-gray-600">{plato.descripcion}</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-red-500 hover:text-red-600 mr-2 focus:outline-none"
                      onClick={() => handleEliminarPlato(plato._id)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="text-orange-500 hover:text-orange-600 mr-2 focus:outline-none"
                      onClick={() => handleEditPlato(plato)}
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

      {modalIsOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">
                {nuevoPlato._id ? "Editar Plato" : "Nuevo Plato"}
              </h2>
              <form onSubmit={handleSubmitNuevoPlato}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevoPlato.nombre}
                    onChange={handleChangeNuevoPlato}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ingredientes (separados por comas)
                  </label>
                  <input
                    type="text"
                    name="ingredientes"
                    value={nuevoPlato.ingredientes}
                    onChange={handleChangeNuevoPlato}
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
                    value={nuevoPlato.descripcion}
                    onChange={handleChangeNuevoPlato}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Precio
                  </label>
                  <input
                    type="number"
                    name="precio"
                    value={nuevoPlato.precio}
                    onChange={handleChangeNuevoPlato}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Categoría
                  </label>
                  <select
                    name="categoria"
                    value={
                      categoriaSeleccionada
                        ? categoriaSeleccionada._id
                          ? categoriaSeleccionada._id
                          : categoriaSeleccionada.id
                        : ""
                    }
                    onChange={handleChangeCategoria}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria._id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
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
                    {nuevoPlato._id ? "Editar Plato" : "Crear Plato"}
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

export default Platos;
