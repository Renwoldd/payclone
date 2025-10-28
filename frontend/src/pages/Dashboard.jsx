// import React, { useContext, useState, useEffect } from "react";
// import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../axios";
// import {
//   HomeIcon,
//   ShieldCheckIcon,
//   Cog6ToothIcon,
//   ArrowLeftCircleIcon,
//   ArrowRightCircleIcon,
// } from "@heroicons/react/24/outline";
// import bgDashboard from "./bg_dashboard.png"; // ✅ Import background image

// export default function Dashboard() {
//   const { user, setUser, fetchUser, checked } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [showModal, setShowModal] = useState(false);
//   const [disablePassword, setDisablePassword] = useState("");
//   const [disableError, setDisableError] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [toast, setToast] = useState(null);

//   useEffect(() => {
//     if (checked && !user) {
//       navigate("/login", { replace: true });
//     }
//   }, [checked, user, navigate]);

//   const showToast = (message) => {
//     setToast(message);
//     setTimeout(() => setToast(null), 3000);
//   };

//   const logout = async () => {
//     try {
//       await api.post("/api/logout");
//       setUser(null);
//       showToast("You have been logged out.");
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   const handle2FASetup = () => {
//     window.location.href = "/2fa-setup";
//   };

//   const handle2FADisable = async () => {
//     setDisableError("");
//     if (!disablePassword.trim()) {
//       setDisableError("Password is required.");
//       return;
//     }
//     try {
//       await api.post("/api/2fa/disable", { password: disablePassword });
//       showToast("Two-Factor Authentication has been disabled.");
//       setShowModal(false);
//       setDisablePassword("");
//       fetchUser();
//     } catch (err) {
//       setDisableError(err.response?.data?.message || "Failed to disable 2FA");
//     }
//   };

//   const Home = () => (
//     <div className="flex items-center justify-center h-full">
//       <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-8 text-center max-w-2xl w-full">
//         <h1 className="text-3xl font-bold mb-4">
//           Welcome, {user?.full_name || user?.name || "User"} 👋
//         </h1>
//         <p><strong>Email:</strong> {user?.email}</p>
//         <p><strong>Mobile:</strong> {user?.phone || "N/A"}</p>
//         <p><strong>2FA Status:</strong> {user?.two_factor_enabled ? "✅ Enabled" : "❌ Disabled"}</p>
//       </div>
//     </div>
//   );

//   const Security = () => (
//     <div className="flex items-center justify-center h-full">
//       <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-2xl w-full">
//         <h2 className="text-xl font-semibold mb-4 text-center">Account Security</h2>
//         <p><strong>Last Login:</strong> {user?.last_login_at || "N/A"}</p>
//         <p><strong>IP Address:</strong> {user?.last_login_ip || "N/A"}</p>
//         <p><strong>Browser:</strong> {user?.last_login_user_agent || "N/A"}</p>
//       </div>
//     </div>
//   );

//   const Settings = () => (
//     <div className="flex items-center justify-center h-full">
//       <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-2xl w-full text-center">
//         <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
//         {user?.two_factor_enabled ? (
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//           >
//             Disable 2FA
//           </button>
//         ) : (
//           <button
//             onClick={handle2FASetup}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//           >
//             Enable 2FA
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   if (!checked) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
//         <p className="text-gray-600 text-lg">Checking session...</p>
//       </div>
//     );
//   }

//   if (checked && !user) return null;

//   return (
//     <div
//       className="flex min-h-screen bg-cover bg-center overflow-hidden"
//       style={{ backgroundImage: `url(${bgDashboard})` }}
//     >
//       {/* Sidebar */}
//       <aside
//         className={`flex flex-col justify-between bg-[#0B1E3F] text-white transition-all duration-300 ease-in-out ${
//           sidebarOpen ? "w-64" : "w-20"
//         }`}
//       >
//         <div className="p-6 space-y-6">
//           <div className="flex flex-col items-center text-center">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
//               alt="User Avatar"
//               className="w-16 h-16 rounded-full border-2 border-white bg-black object-cover"
//             />
//             {sidebarOpen && (
//               <h2 className="text-2xl font-bold mt-4">🚀 Dashboard</h2>
//             )}
//           </div>

//           <nav className="space-y-4">
//             <NavLink
//               to="/dashboard"
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-2 ${
//                   isActive ? "text-blue-300 font-semibold" : "hover:text-blue-200"
//                 }`
//               }
//             >
//               <HomeIcon className="h-5 w-5" />
//               {sidebarOpen && "Home"}
//             </NavLink>
//             <NavLink
//               to="/dashboard/security"
//               className={({ isActive }) =>
//                 `flex items-center gap-2 ${
//                   isActive ? "text-blue-300 font-semibold" : "hover:text-blue-200"
//                 }`
//               }
//             >
//               <ShieldCheckIcon className="h-5 w-5" />
//               {sidebarOpen && "Security"}
//             </NavLink>
//             <NavLink
//               to="/dashboard/settings"
//               className={({ isActive }) =>
//                 `flex items-center gap-2 ${
//                   isActive ? "text-blue-300 font-semibold" : "hover:text-blue-200"
//                 }`
//               }
//             >
//               <Cog6ToothIcon className="h-5 w-5" />
//               {sidebarOpen && "Settings"}
//             </NavLink>
//           </nav>
//         </div>

//         <div className="p-6 space-y-4">
//           <button
//             onClick={logout}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
//           >
//             {sidebarOpen ? "Logout" : "🚪"}
//           </button>
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="flex items-center justify-center w-full bg-blue-700 hover:bg-blue-600 py-2 rounded transition"
//           >
//             {sidebarOpen ? (
//               <ArrowLeftCircleIcon className="h-6 w-6" />
//             ) : (
//               <ArrowRightCircleIcon className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:p-10 overflow-y-auto">
//         <Routes>
//           <Route path="" element={<Home />} />
//           <Route path="security" element={<Security />} />
//           <Route path="settings" element={<Settings />} />
//         </Routes>
//       </main>

//       {/* Toast */}
//       {toast && (
//         <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded shadow-lg z-50">
//           {toast}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
//             <h2 className="text-lg font-semibold mb-4">Confirm Disable 2FA</h2>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Enter your password
//             </label>
//             <input
//               type="password"
//               value={disablePassword}
//                             onChange={(e) => setDisablePassword(e.target.value)}
//               className="w-full border p-2 rounded mb-2"
//               placeholder="••••••••"
//             />
//             {disableError && (
//               <div className="text-red-500 text-sm mb-2">{disableError}</div>
//             )}
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   setDisablePassword("");
//                   setDisableError("");
//                 }}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handle2FADisable}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//               >
//                 Disable
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../axios";
import {
  HomeIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
// import paypalLogo from "./paypal-logo.png"; // ✅ Your PayPal-style logo

export default function Dashboard() {
  const { user, setUser, fetchUser, checked } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");
  const [disableError, setDisableError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (checked && !user) {
      navigate("/login", { replace: true });
    }
  }, [checked, user, navigate]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const logout = async () => {
    try {
      await api.post("/api/logout");
      setUser(null);
      showToast("You have been logged out.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handle2FASetup = () => {
    window.location.href = "/2fa-setup";
  };

  const handle2FADisable = async () => {
    setDisableError("");
    if (!disablePassword.trim()) {
      setDisableError("Password is required.");
      return;
    }
    try {
      await api.post("/api/2fa/disable", { password: disablePassword });
      showToast("Two-Factor Authentication has been disabled.");
      setShowModal(false);
      setDisablePassword("");
      fetchUser();
    } catch (err) {
      setDisableError(err.response?.data?.message || "Failed to disable 2FA");
    }
  };

  const Home = () => (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 text-center max-w-2xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Welcome, {user?.full_name || user?.name || "User"} 👋
        </h1>
        <p className="text-gray-600">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="text-gray-600">
          <strong>Mobile:</strong> {user?.phone || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>2FA Status:</strong>{" "}
          {user?.two_factor_enabled ? (
            <span className="text-green-600 font-medium">Enabled</span>
          ) : (
            <span className="text-red-600 font-medium">Disabled</span>
          )}
        </p>
      </div>
    </div>
  );

  const Security = () => (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 text-center max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Account Security
        </h2>
        <p className="text-gray-600">
          <strong>Last Login:</strong> {user?.last_login_at || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>IP Address:</strong> {user?.last_login_ip || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Browser:</strong> {user?.last_login_user_agent || "N/A"}
        </p>
      </div>
    </div>
  );

  const Settings = () => (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 text-center max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Two-Factor Authentication
        </h2>
        {user?.two_factor_enabled ? (
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#DC3545] text-white px-5 py-2 rounded-md hover:bg-red-700 transition font-medium"
          >
            Disable 2FA
          </button>
        ) : (
          <button
            onClick={handle2FASetup}
            className="bg-[#0070BA] text-white px-5 py-2 rounded-md hover:bg-[#005C9E] transition font-medium"
          >
            Enable 2FA
          </button>
        )}
      </div>
    </div>
  );

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Checking session...</p>
      </div>
    );
  }

  if (checked && !user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-20"
          }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center text-center">
            {/* <img
              src={paypalLogo}
              alt="Logo"
              className={`transition-all ${sidebarOpen ? "h-8" : "h-6"
                } object-contain`}
            /> */}
            {sidebarOpen && (
              <h2 className="text-sm text-gray-500 mt-2">Dashboard</h2>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive
                  ? "bg-[#0070BA]/10 text-[#0070BA]"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <HomeIcon className="h-5 w-5" />
              {sidebarOpen && "Home"}
            </NavLink>
            <NavLink
              to="/dashboard/security"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive
                  ? "bg-[#0070BA]/10 text-[#0070BA]"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <ShieldCheckIcon className="h-5 w-5" />
              {sidebarOpen && "Security"}
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive
                  ? "bg-[#0070BA]/10 text-[#0070BA]"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Cog6ToothIcon className="h-5 w-5" />
              {sidebarOpen && "Settings"}
            </NavLink>
          </nav>
        </div>

        {/* Footer buttons */}
        <div className="p-4 space-y-3 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full bg-[#0070BA] text-white py-2 rounded-md hover:bg-[#005C9E] transition text-sm font-medium"
          >
            <PowerIcon className="h-5 w-5" />
            {sidebarOpen && "Logout"}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center justify-center w-full py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            {sidebarOpen ? (
              <ArrowLeftCircleIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ArrowRightCircleIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="security" element={<Security />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Disable 2FA
            </h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your password
            </label>
            <input
              type="password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
            {disableError && (
              <div className="text-red-500 text-sm mb-2">{disableError}</div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setDisablePassword("");
                  setDisableError("");
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handle2FADisable}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Disable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
