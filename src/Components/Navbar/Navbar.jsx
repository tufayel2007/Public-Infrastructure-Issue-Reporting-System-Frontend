import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

import logoIMG from "../../assets/Profiel.png";
import { auth } from "../../../FirebasseConfig";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("are you shur Logout");
    if (confirmLogout) {
      await signOut(auth);
      navigate("/login");
    }
  };

  // Main navigation links (shared between desktop and mobile)
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/allIssues", label: "All Issues" },
    { to: "/about", label: "About" },
    { to: "/allservises", label: "All Services" },
    { to: "/HowItWorksSection", label: "How It Works" },
    { to: "/featuresSection", label: "Features" },
    { to: "/latestResolvedIssuess", label: "Resolved Issues" },
    { to: "/reportIssue", label: "Report Issue" },
  ];

  const activeLinkClass =
    "btn btn-sm md:btn-md btn-primary text-primary-content font-bold";
  const inactiveLinkClass = "btn btn-sm md:btn-md btn-ghost hover:bg-base-200";

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-base-100 shadow-md flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-primary"></span>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-50 h-16 px-4 md:px-8">
      {/* Logo & Brand */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-4 shadow bg-base-100 rounded-box w-64 gap-2"
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : inactiveLinkClass
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/adminLogin"
                className="btn btn-sm bg-green-300 animate-pulse text-black"
              >
                Access Portal
              </NavLink>
            </li>
          </ul>
        </div>

        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logoIMG}
            alt="PIIRS Logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-base-100"
          />
          <div>
            <span className="font-bold text-lg md:text-xl text-primary hidden sm:block">
              PIIRS
            </span>
            <p className="text-xs text-base-content/70 hidden md:block -mt-1">
              Public Infrastructure Issue Reporting System
            </p>
          </div>
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? activeLinkClass : inactiveLinkClass
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/adminLogin"
              className="btn btn-sm bg-green-300 animate-pulse text-black"
            >
              Access Portal
            </NavLink>
          </li>
        </ul>
      </div>

      {/* User Section */}
      <div className="navbar-end">
        {!user ? (
          <NavLink
            to="/login"
            className="btn btn-primary btn-sm md:btn-md font-semibold"
          >
            Login
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="rounded-full object-cover"
                    onError={(e) => (e.target.src = logoIMG)}
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-primary/50" />
                )}
              </div>
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-4 shadow-lg bg-base-100 rounded-box w-64 mt-3 border border-base-300"
            >
              <li className="menu-title">
                <span className="font-bold text-lg">
                  {user.displayName || "User"}
                </span>
                <span className="text-sm text-base-content/60">
                  {user.email}
                </span>
              </li>
              <div className="divider my-2"></div>
              <li>
                <NavLink
                  to="/dashboard"
                  className="btn btn-ghost justify-start"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="btn btn-ghost justify-start">
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/myIssues" className="btn btn-ghost justify-start">
                  My Reported Issues
                </NavLink>
              </li>
              <div className="divider my-2"></div>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-outline w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
