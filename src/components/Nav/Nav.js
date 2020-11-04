import React from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import NavBarWrapper, {
  AddIcon,
  InputItems,
  LinkItems,
  UserAvatar,
} from "./nav.styled";

export default function NavBar() {
  return (
    <NavBarWrapper>
      <LinkItems>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/comments">Comments</NavLink>
        <NavLink to="/">Posts</NavLink>
      </LinkItems>

      <UserAvatar />
    </NavBarWrapper>
  );
}

export const InputPlus = ({ clickToShow }) => (
  <InputItems onClick={() => clickToShow(true)}>
    <FaPlus />
  </InputItems>
);
