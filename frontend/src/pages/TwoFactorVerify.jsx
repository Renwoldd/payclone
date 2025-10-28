// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import api from "../axios";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"; // ✅ Back icon
// import bgLogin from "./bg_login.png"; // ✅ Background image

// function TwoFactorVerify() {
//   const { fetchUser } = useContext(AuthContext);
//   const [code, setCode] = useState("");
//   const [error, setError] = useState("");
//   const nav = useNavigate();

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError("");

//     const email = sessionStorage.getItem("2fa_email");
//     const password = sessionStorage.getItem("2fa_password");

//     if (!email || !password) {
//       setError("Session expired. Please log in again.");
//       nav("/login");
//       return;
//     }

//     try {
//       await api.post("/api/2fa/verify-login", {
//         email,
//         password,
//         code,
//       });

//       await fetchUser();
//       nav("/dashboard");
//     } catch (err) {
//       console.error("2FA verification failed:", err.response?.data || err.message);

//       if (err.response?.status === 422) {
//         setError("Invalid code. Please try again.");
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
//         {/* ✅ Back Button */}
//         <button
//           onClick={() => nav(-1)}
//           className="mb-4 flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
//         >
//           <ArrowLeftCircleIcon className="h-6 w-6" />
//           <span className="font-medium">Back</span>
//         </button>

//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Two-Factor Verification
//         </h1>

//         {error && (
//           <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleVerify} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Enter 6-digit code
//             </label>
//             <input
//               type="text"
//               className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               placeholder="123456"
//               required
//               maxLength={6}
//               pattern="\d{6}"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
//           >
//             Verify & Login
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-500 mt-6">
//           Lost access?{" "}
//           <a href="/login" className="text-indigo-500 hover:underline">
//             Go back to login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default TwoFactorVerify;



import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
// import bgLogin from "./bg_login.png"; // ✅ Background image

function TwoFactorVerify() {
  const { fetchUser } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const email = sessionStorage.getItem("2fa_email");
    const password = sessionStorage.getItem("2fa_password");

    if (!email || !password) {
      setError("Session expired. Please log in again.");
      nav("/login");
      return;
    }

    try {
      await api.post("/api/2fa/verify-login", {
        email,
        password,
        code,
      });

      await fetchUser();
      nav("/dashboard");
    } catch (err) {
      console.error("2FA verification failed:", err.response?.data || err.message);

      if (err.response?.status === 422) {
        setError("Invalid code. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
    // style={{ backgroundImage: `url(${bgLogin})` }}
    >
      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-8">
        {/* Back Button */}
        <button
          onClick={() => nav(-1)}
          className="mb-4 flex items-center gap-2 text-[#0070BA] hover:text-[#005c99] transition"
        >
          <ArrowLeftCircleIcon className="h-6 w-6" />
          <span className="font-medium">Back</span>
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Two-Factor Verification
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter 6-digit code
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0070BA]/60 focus:border-[#0070BA] p-2 text-center tracking-widest text-lg"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              required
              maxLength={6}
              pattern="\d{6}"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0070BA] text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-[#005c99] hover:shadow-lg hover:scale-[1.02] transition"
          >
            Verify & Login
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Lost access?{" "}
          <a href="/login" className="text-[#0070BA] hover:underline font-medium">
            Go back to login
          </a>
        </p>
      </div>
    </div>
  );
}

export default TwoFactorVerify;
