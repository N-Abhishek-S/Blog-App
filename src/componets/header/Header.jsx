import React, { useState } from "react";
import { Logo } from "../index";
import { LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For mobile menu icons

function Header() {
  // Get authentication status from Redux store
  const authStatus = useSelector((state) => state.auth.status);
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  // Define navigation items
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    // Navbar container with a gradient background and shadow
    
    <div className="shadow-md w-full h-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <header className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div>
            <Link to="/">
              <Logo width="80px" />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigation(item.slug)}
                      className="px-5 py-2 text-white bg-blue-700 rounded-lg transition-all duration-300 hover:bg-white hover:text-blue-600 shadow-md"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Show Logout button only if user is logged in */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white text-blue-600 shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Menu - Shown when isOpen is true */}
        {isOpen && (
          <ul className="md:hidden mt-3 bg-white text-blue-700 p-4 rounded-lg shadow-lg space-y-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigation(item.slug);
                        setIsOpen(false); // Close menu after navigation
                      }}
                      className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-700 shadow-md"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Show Logout button only if user is logged in */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </header>
    </div>
  );
}

/* 
WHAT WE DO HERE :-
1) We import necessary components and dependencies like Logo, LogoutBtn, Container, Link, useSelector, useNavigate.
2) We create a function `Header`.
3) We define a list of `navItems` that contains {name, slug, active}.
4) If the user is logged in (`authStatus` is true), certain links (e.g., Add Post) are shown.
5) We use the `Container` component for default styling (given using Tailwind CSS).
6) Inside `nav > div`, we use the Logo component imported from index.
7) Inside `nav > ul`, we loop through `navItems` using the `map` function.
8) Each `li` element has a `key` because React requires unique keys for list items.
9) The `button` inside `li` has an `onClick` event that navigates to the item's slug.
10) The Logout button (`LogoutBtn`) is displayed only when `authStatus` is true.
11) We add a responsive mobile menu with a hamburger icon.
12) Clicking the mobile menu toggles the menu visibility.
*/

export default Header;
