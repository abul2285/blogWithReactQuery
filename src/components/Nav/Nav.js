import React from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import NavBarWrapper, { InputItems, LinkItems } from "./nav.styled";

export default function NavBar() {
  return (
    <NavBarWrapper>
      <LinkItems>
        <NavLink to="/">Posts</NavLink>
        <NavLink to="/users">Users</NavLink>
        {/* <NavLink to="/comments">Comments</NavLink> */}
      </LinkItems>
    </NavBarWrapper>
  );
}

export const InputPlus = ({ clickToShow, children }) => (
  <InputItems onClick={() => clickToShow(true)}>{children}</InputItems>
);
