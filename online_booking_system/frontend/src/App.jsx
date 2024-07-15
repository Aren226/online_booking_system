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
import AddPage from "./pages/AddPage";
import VehiclePage from "./pages/VehiclePage";

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
        console.log(response.json)
        return response.json();
      })
      .then((data) => setCars(data))
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setMessage("Failed to load cars");
      });
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/cars/:id' element={<VehiclePage />} />
        {/* <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} /> */}
      </Route>
    )
  );
  // return (
    // <>
    //   <HomePage />
    //   <div className="App">
    //     <header className="App-header">
    //       {message ? <p>{message}</p> : null}
    //       <ul>
    //         {cars.map((car) => (
    //           <li key={car.id}>{car.make} {car.model}</li>
    //         ))}
    //       </ul>
    //     </header>
    //   </div>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<MainLayout />} />
    //     <Route index element={<HomePage/>}/>
    //   </Routes>
    // </BrowserRouter>
    return (<RouterProvider router={router} />);
  // );
}

export default App;
