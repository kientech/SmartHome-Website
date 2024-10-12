import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LivingRoom from "./pages/LivingRoom";
import Schedules from "./pages/Schedules";
import BedRoom from "./pages/BedRoom";
import KitchenRoom from "./pages/KitchenRoom";

const Layout = () => {
  return (
    <div className="">
      <div className="flex bg-[#F5F7FE] min-h-screen p-4 rounded-xl">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="px-4 mx-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="living-room" element={<LivingRoom />} />
          <Route path="bed-room" element={<BedRoom />} />
          <Route path="kitchen-room" element={<KitchenRoom />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="logout" element={<div>Logging out...</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
