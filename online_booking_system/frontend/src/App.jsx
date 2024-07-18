import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AddVehiclePage from "./pages/AddVehiclePage";
import VehiclePage from "./pages/VehiclePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [count, setCount] = useState(0);
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState("Loading..."); // Added message state

  useEffect(() => {
    fetch("/api/cars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response.json);
        return response.json();
      })
      .then((data) => setCars(data))
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setMessage("Failed to load cars");
      });
  }, []);

  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/cars/:id" element={<VehiclePage />} />
          <Route path='/add-car' element={<AddVehiclePage addJobSubmit={addJob} />} />
        {/* <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        /> */}
        <Route path='*' element={<NotFoundPage />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
