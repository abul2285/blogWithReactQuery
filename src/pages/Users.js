import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import request from "graphql-request";
import { FaArrowUp, FaBookmark, FaJs, FaThumbsUp } from "react-icons/fa";

import Error from "../components/error/Error";
import Loading from "../components/loading/Loading";
import { EndPoint, GetUsersQuery } from "../graphql/query";
import {
  GridBody,
  GridFooter,
  GridHeader,
  GridItem,
  GridText,
  GridWrapper,
} from "../styles/Users.styled";

const Header = () => (
  <GridHeader className="top">
    <FaJs />
    <FaBookmark />
  </GridHeader>
);

const Body = ({ id }) => (
  <GridBody className="image">
    <img src={`https://i.pravatar.cc/100?u=${id}`} alt="" />
  </GridBody>
);

const Footer = () => (
  <GridFooter className="bottom">
    <span>
      <FaThumbsUp />
      {~~((Math.random() + 1) * 10)}
    </span>
    <span className="separator"></span>
    <span>
      <FaArrowUp />
      {~~((Math.random() + 1) * 20)}
    </span>
  </GridFooter>
);

const Name = ({ user }) => (
  <GridText>
    <Link to={`users/${user.id}`}> {user.name}</Link>
  </GridText>
);

function UserGrid({ num, user }) {
  return (
    <GridItem className={`item item-${num}`}>
      <Header />
      <Name user={user} />
      <Body id={user.id} />
      <Footer />
    </GridItem>
  );
}

const fetchUsers = async () => {
  const { users } = await request(EndPoint, GetUsersQuery);
  return users;
};

const Users = () => {
  const { data, status } = useQuery("users", fetchUsers);
  return (
    <>
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {status === "success" && (
        <>
          <GridWrapper className="container">
            {data.data.map((user, i) => (
              <UserGrid user={user} key={user.id} />
            ))}
          </GridWrapper>
        </>
      )}
    </>
  );
};

export default Users;
