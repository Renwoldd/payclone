// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../axios";
// import bgLogin from "./bg_login.png"; // ✅ Import your background image

// function Login() {
//   const { fetchUser } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.get("/sanctum/csrf-cookie");

//       const response = await api.post("/api/login", {
//         email: email.trim(),
//         password,
//       });

//       if (response.data.requires_2fa) {
//         sessionStorage.setItem("2fa_email", email.trim());
//         sessionStorage.setItem("2fa_password", password);
//         navigate("/2fa-verify");
//         return;
//       }

//       setTimeout(async () => {
//         await fetchUser();
//         navigate("/dashboard", { replace: true });
//       }, 300);
//     } catch (err) {
//       console.error("Login failed:", err.response?.data || err.message);

//       if (err.response?.status === 429) {
//         setError("Too many login attempts. Please wait a minute and try again.");
//       } else if (err.response?.status === 401 || err.response?.status === 422) {
//         setError("Invalid email or password.");
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <div
//       className="flex min-h-screen items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgLogin})` }}
//     >
//       <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-md p-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           PayApp Login
//         </h1>

//         {error && (
//           <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-500 mt-6">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-indigo-500 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../axios";
// import paypalLogo from "./paypal-logo.png"; // ✅ Add your PayPal-style logo image here

function Login() {
  const { fetchUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/api/login", {
        email: email.trim(),
        password,
      });

      if (response.data.requires_2fa) {
        sessionStorage.setItem("2fa_email", email.trim());
        sessionStorage.setItem("2fa_password", password);
        navigate("/2fa-verify");
        return;
      }

      setTimeout(async () => {
        await fetchUser();
        navigate("/dashboard", { replace: true });
      }, 300);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      if (err.response?.status === 429) {
        setError("Too many login attempts. Please wait a minute and try again.");
      } else if (err.response?.status === 401 || err.response?.status === 422) {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        {/* PayPal Logo */}
        <div className="flex justify-center mb-6">
          {/* <img src={paypalLogo} alt="PayPal" className="h-8" /> */}
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#0070BA] text-white py-2 rounded-md font-semibold hover:bg-[#005C9E] transition"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-[#0070BA] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
