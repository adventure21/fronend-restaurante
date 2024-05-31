import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerMenuPorId } from "../services/menusApi";

const MenuDetalle = () => {
  const { idMenu } = useParams();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await obtenerMenuPorId(idMenu);
        setMenu(menuData);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, [idMenu]);

  if (!menu) {
    return null;
  }

  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* Fondo con imagen */}
      <div className="absolute inset-0 bg-cover bg-center bg-[#dfa674] ">
        <div className=" absolute left-[24vw] bg-white rounded-full w-[50vw] h-[50vw] animate-slide-in-left"></div>
        {/* Contenedor principal */}
        <div className="relative z-10 flex flex-col flex-1 overflow-y-auto mt-[50px] animate-flip-x ">
          <div className="p-4 flex justify-center">
            <div
              className="bg-white rounded-lg shadow-md p-6 max-w-3xl  relative"
              style={{
                backgroundImage: `url('https://st.depositphotos.com/1016729/3637/i/450/depositphotos_36373753-stock-photo-old-menu-background-vintage-paper.jpg')`,
              }}
            >
              {/* Imagen de fondo para el card */}

              <h2 className="text-3xl font-bold mb-4 relative text-white">
                {menu.nombre}
              </h2>
              <p className="text-gray-100 mb-2 relative">{menu.descripcion}</p>
              <div className="border-t border-gray-300 mt-4 pt-4 relative text-white">
                <h3 className="text-xl font-bold mb-2 ">Platos:</h3>
                <ul>
                  {menu.platos.map((plato) => (
                    <li key={plato._id} className="mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-medium">
                            {plato.nombre}
                          </h4>
                          <p className="text-white">{plato.descripcion}</p>
                          <p className="text-white">
                            Ingredientes: {plato.ingredientes.join(", ")}
                          </p>
                          <p className="text-white">Precio: ${plato.precio}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetalle;
