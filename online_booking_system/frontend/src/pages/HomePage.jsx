import { useState, useEffect } from "react";
import VehicleList from "../components/VehicleList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const storedRole = localStorage.getItem("role");
  console.log(storedRole);
  const navigate = useNavigate();
  useEffect(() => {
    if(!storedRole){
      navigate('/login');
    }
    fetch("/api/cars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setVehicles(data))
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setMessage("Failed to load cars");
      });
  }, []);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleList key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
