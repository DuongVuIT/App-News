import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
const NavItem = ({ to, value, closed, Icon }) => {
  const commontClass =
    "flex items-center space-x-2 w-full p-2 block whitespace-nowrap whitespace-nowrap";
  const activeClass = commontClass + " flex bg-blue-500 text-black ";
  const inactiveClass = commontClass + "text-gray-500 ";

  return (
    <NavLink
      className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      to={to}
    >
      {Icon}
      <span
        className={
          closed
            ? "w-0 transition-width overflow-hidden"
            : "w-full transition-width overflow-hidden"
        }
      >
        {value}
      </span>
    </NavLink>
  );
};
export default function Navbar({ closed }) {
  return (
    <nav>
      <ul>
        <li>
          <NavItem
            closed={closed}
            to="/"
            value="Home"
            Icon={<AiFillHome size={25} />}
          />
        </li>
        <li>
          <NavItem
            closed={closed}
            to="/create-post"
            value="Create Post"
            Icon={<MdOutlineCreateNewFolder size={25} />}
          />
        </li>
      </ul>
    </nav>
  );
}
