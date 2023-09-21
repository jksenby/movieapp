import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import "./appheader.css";
import { useState } from "react";

const AppHeader = ({ handleSearch }) => {
  return (
    <header>
      <span className="logo">Z-Project</span>
      <div className="pageName">
        <div>
          <input
            placeholder="Searching for a film"
            onChange={(i) => handleSearch(i.target.value)}
          />
          <AiOutlineSearch />
        </div>
        <NavLink
          end
          style={({ isActive = true }) => ({
            color: isActive ? "#9F0013" : "inherit",
            textDecoration: "none",
          })}
          to="/"
        >
          Movies
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
