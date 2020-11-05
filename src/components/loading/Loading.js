import React from "react";
import styled from "styled-components";
import Spinner from "../spinner/Spinner";
const LoadingWrapper = styled.div`
  display: grid;
  place-items: center;
  min-width: 100vw;
  min-height: 100vh;
  font-size: 50px;
  color: green;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
}
