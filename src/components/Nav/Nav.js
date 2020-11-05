import React from "react";
import { NavLink } from "react-router-dom";
import NavBarWrapper, { InputItems, LinkItems } from "./nav.styled";

export default function NavBar() {
  return (
    <NavBarWrapper>
      <LinkItems>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
      </LinkItems>
    </NavBarWrapper>
  );
}

export const InputPlus = ({ clickToShow, children }) => (
  <InputItems onClick={() => clickToShow(true)}>{children}</InputItems>
);
