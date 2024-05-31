import axios from "axios";

const baseURL = "http://127.0.0.1:8000/platos";

const headers = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers,
});

// Función para obtener el token del localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró token en el almacenamiento local");
  }
  return token;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para manejar errores de Axios
const handleError = (error) => {
  console.error("Request failed:", error);

  if (error.response) {
    console.error("Response status:", error.response.status);
    throw new Error(error.response.data.message || "Error de servidor");
  } else if (error.request) {
    console.error("No response received:", error.request);
    throw new Error("No se recibió respuesta del servidor");
  } else {
    console.error("Request setup error:", error.message);
    throw new Error("Error al enviar la solicitud");
  }
};

export const obtenerPlatos = async () => {
  try {
    const response = await axiosInstance.get("/platos");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const crearPlato = async (
  nombre,
  ingredientes,
  descripcion,
  precio,
  categoria
) => {
  try {
    const response = await axiosInstance.post("/crear", {
      nombre,
      ingredientes,
      descripcion,
      precio,
      categoria,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const editarPlato = async (
  id,
  nombre,
  ingredientes,
  descripcion,
  precio,
  categoria
) => {
  try {
    const response = await axiosInstance.put(`/editar/${id}`, {
      nombre,
      ingredientes,
      descripcion,
      precio,
      categoria,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const eliminarPlato = async (id) => {
  try {
    const response = await axiosInstance.delete(`/eliminar/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const obtenerPlatoPorId = async (id) => {
  try {
    const response = await axiosInstance.get(`/plato/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const obtenerPlatosPorCategoria = async (categoria) => {
  try {
    const response = await axiosInstance.get(`/porCategoria/${categoria}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
