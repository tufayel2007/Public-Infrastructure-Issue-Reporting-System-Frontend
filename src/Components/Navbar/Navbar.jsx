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
    const confirmLogout = window.confirm("আপনি কি লগআউট করতে চান?");
    if (confirmLogout) {
      await signOut(auth);
      navigate("/login");
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
              : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allIssues"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
              : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
          }
        >
          All Issues
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
              : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allservises"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
              : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
          }
        >
          All Servises
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/reportIssue"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
              : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
          }
        >
          Report An Issue
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/adminLogin"
          className={({ isActive }) =>
            `
      btn btn-xs md:btn-sm
      rounded-full
      px-4 md:px-5
      py-2
      font-medium
      tracking-wide
      text-sm md:text-base
      transition-all duration-200 ease-in-out
      animate-bounce-slow
      ${
        isActive
          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
          : "bg-base-200 text-base-content hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:shadow-md"
      }
      `
          }
        >
          Access Portal
        </NavLink>
      </li>
    </>
  );

  if (loading) {
    return (
      <div
        className="navbar bg-base-100 shadow-md sticky
       top-0 z-50 h-16 flex items-center justify-center"
      >
        <span
          className="loading loading-spinner
         text-primary"
        ></span>
      </div>
    );
  }

  return (
    <div
      className="navbar bg-base-100 text-base-content shadow-md 
               fixed top-0 left-0 right-0 z-50 
               transition-colors duration-300 h-16"
    >
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
            className="menu menu-sm dropdown-content mt-3 p-3 
          shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logoIMG}
            alt="Logo"
            className="w-9 h-9 rounded-full object-cover border
             border-base-300"
          />
          <span
            className="hidden md:inline-flex font-bold 
          text-xl text-primary"
          >
            Public Infrastructure Issue Reporting System
          </span>
          <span
            className="md:hidden font-bold 
          text-lg text-primary"
          >
            PIIRS
          </span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {!user ? (
          <NavLink
            to="/login"
            className="btn btn-primary btn-sm 
            md:btn-md font-bold text-primary-content"
          >
            Login
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn
               btn-ghost btn-circle avatar group"
            >
              <div
                className="w-10 h-10 rounded-full 
              ring ring-primary ring-offset-2 ring-offset-base-100"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="rounded-full object-cover"
                    onError={(e) => (e.target.src = logoIMG)}
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-base-content/40" />
                )}
              </div>
              <div
                className="absolute hidden group-hover:block 
              bg-base-300 text-base-content text-xs
               rounded px-2 
              py-1 -left-6 top-12 whitespace-nowrap
              
              z-10 shadow"
              >
                {user.displayName}
              </div>
            </label>

            <ul
              className="menu menu-sm
             dropdown-content
             mt-3 p-3 shadow bg-base-100 
            rounded-box w-56 border border-base-300"
            >
              <li
                className="menu-title text-center
               pb-2 border-b border-base-300"
              >
                <span className="font-bold">{user.displayName}</span>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
                      : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allIssues"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
                      : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
                  }
                >
                  All Issues
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
                      : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  to="/allservises"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
                      : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
                  }
                >
                  All Servises
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  to="/adminLogin"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
                      : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
                  }
                >
                  Dashboord
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/adminLogin"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
                      : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li className="border-t border-base-300 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="text-error hover:bg-error 
                  hover:text-error-content w-full
                   text-left"
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
