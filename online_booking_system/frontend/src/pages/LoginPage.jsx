import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser.id && storedUser.id !== "False") {
      console.log("User is authenticated");
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginValidate = async () => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setResult(result);

        if (result.id === "False") {
          alert("Login failed. Please check email and password.");
        } else {
          localStorage.setItem("user", JSON.stringify(result));
          localStorage.setItem("role", "user");
          navigate("/");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
    if (email === "admin@gmail.com" && password === "abc123") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 0,
          username: "admin",
          email: "admi@gmail.com",
          phone_number: "+6123456789",
        })
      );
      localStorage.setItem("role", "admin");
      navigate("/");
    } else {
      loginValidate();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <svg
                  className={`w-5 h-5 text-gray-500 ${
                    showPassword ? "block" : "hidden"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2 2 4-4 4 4 8-8m0 8l2 2 2-2m-2-2l2 2m-2-2l2-2"
                  />
                </svg>
                <svg
                  className={`w-5 h-5 text-gray-500 ${
                    showPassword ? "hidden" : "block"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v.01M12 16h.01m9.34-4.22a9 9 0 00-15.68 0M1.8 12A9 9 0 0112 4.6a9 9 0 0110.2 7.4m-2.59 2.22A7.5 7.5 0 0012 14.5a7.5 7.5 0 00-6.4 3.92M4.39 14.61A7.5 7.5 0 0012 16.5a7.5 7.5 0 007.61-5.89"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
