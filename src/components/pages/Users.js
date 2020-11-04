import React from "react";
import styled from "styled-components";
import { FaArrowUp, FaBookmark, FaJs, FaThumbsUp } from "react-icons/fa";
import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

// const bgChange = (color, n) => `
//         &:nth-child(${n}){
//           background:${color};
//         }
// `;

// ${["red", "green", "blue", "orange"].map((color, i) =>
//   bgChange(color, ++i)
// )}

const GridWrapper = styled.div`
  &.container {
    display: grid;
    margin: 0 auto;
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: repeat(2, minmax(300px, 1fr));
    grid-auto-rows: minmax(300px, 1fr);
    grid-gap: 20px;
  }
`;

const GridItem = styled.div`
  &.item {
    border-radius: 20px;
    background: #111;
    border-radius: 15px;
    display: grid;
    grid-template-rows: 1fr 2fr 4fr 1fr;
    grid-row-gap: 1.1px;
    &:hover {
      & > div.top > * {
        &:nth-child(2) {
          display: block;
        }
      }
    }

    & > div {
      color: white;
      text-align: center;
      letter-spacing: 1px;
      font-family: sans-serif;
      padding: 5px 10px;
      &.top,
      &.bottom {
        display: grid;
        grid-gap: 5px;
      }
    }
  }
`;

const GridHeader = styled.div`
  text-align: center;
  margin: 5px 0;
  border-bottom: 0.5px solid #999;
  & > * {
    justify-self: center;
    font-size: 22px;
    cursor: pointer;
    &:nth-child(2) {
      display: none;
    }
  }
  border-radius: 10px 10px 0 0;
  grid-template-columns: 50px 50px;
  justify-content: space-between;
`;

const GridText = styled.div``;

const GridBody = styled.div`
  position: relative;
  /* box-sizing:border-box; */
  & img {
    position: absolute;
    border-radius: 5%;
    padding: 0 2.5%;
    left: 0;
    top: 0;
    width: 95%;
    height: 100%;
  }
`;

const GridFooter = styled.div`
  border-radius: 0 0 10px 10px;
  grid-template-columns: 1fr auto 1fr;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  & > span > svg {
    /* color:black; */
    font-size: 20px;
    margin-right: 10px;
  }
  & .separator {
    align-self: stretch;
    background: white;
    width: 1px;
  }
`;

const Header = () => (
  <GridHeader className="top">
    <FaJs />
    <FaBookmark />
  </GridHeader>
);

const Body = () => (
  <GridBody className="image">
    <img
      src="https://miro.medium.com/max/720/1*LjR0UrFB2a__5h1DWqzstA.png"
      alt="nature"
    />
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

function RenderHtml({ num, user }) {
  return (
    <GridItem className={`item item-${num}`}>
      <Header />
      <Name user={user} />
      <Body />
      <Footer />
    </GridItem>
  );
}

const fetchUsers = async () => {
  const { users } = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      query {
        users {
          data {
            name
            id
          }
        }
      }
    `
  );
  return users;
};

export default () => {
  const { data, status } = useQuery("user", fetchUsers);
  return (
    <>
      {status === "loading" && <h1>loading....</h1>}
      {status === "error" && <h1>loading....</h1>}
      {status === "success" && (
        <>
          <GridWrapper className="container">
            {data.data.map((user, i) => (
              <RenderHtml user={user} key={user.id} />
            ))}
          </GridWrapper>
        </>
      )}
    </>
  );
};
