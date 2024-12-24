"use client";

import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  // update state on toggle
  interface ToggleEvent extends SyntheticEvent {
    target: HTMLInputElement;
  }

  const handleToggle = (e: ToggleEvent) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme") || "light";
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-square lg:hidden"></div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/admin">Admin</Link>
              </li>
              <li>
                <Link href="/pengadaan">Pengadaan</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            Unibookstore
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
            <li>
              <Link href="/pengadaan">Pengadaan</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
              checked={theme === "light" ? false : true}
              onChange={handleToggle}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
