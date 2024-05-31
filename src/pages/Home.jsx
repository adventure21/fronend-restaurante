import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />
        <div className="p-4">
          <h1 className="text-2xl font-bold">
            Bienvenido a mi sistema de menus
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
