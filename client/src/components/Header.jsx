import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 py-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-yellow-600 font-bold text-2xl px-4">
              High Street Gym
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-yellow-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 px-4"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon from react-icons */}
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } md:hidden absolute top-14 right-0 bg-gray-900 rounded-lg w-64 z-10`}
          >
            {/* Mobile menu items */}
            <div className="py-2">
              {user ? (
                <Link
                  to="/dashboard"
                  className={`block px-4 py-2 text-white hover:text-yellow-600 ${
                    location.pathname === "/dashboard" ? "text-yellow-600" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : null}
              <Link
                to="/blog"
                className="block px-4 py-2 text-white hover:text-yellow-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="#"
                className="block px-4 py-2 text-white hover:text-yellow-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <button
                onClick={() => {
                  user ? handleLogout() : navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500"
              >
                {/* Change the button text if the user is logged in/out */}
                {user ? "Logout" : "Login"}
              </button>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {/* Desktop navigation links */}
            {user ? (
              <Link
                to="/dashboard"
                className={`text-white hover:text-yellow-600 ${
                  location.pathname === "/dashboard" ? "text-yellow-600" : ""
                }`}
              >
                Dashboard
              </Link>
            ) : null}
            <Link to="/blog" className="text-white hover:text-yellow-600">
              Blog
            </Link>
            <Link to="#" className="text-white hover:text-yellow-600">
              Contact
            </Link>
            <button
              onClick={user ? handleLogout : () => navigate("/login")}
              className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500"
            >
              {/* Change the button text if the user is logged in/out */}
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
