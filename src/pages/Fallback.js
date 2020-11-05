import React from "react";
import styled from "styled-components";

export const ErrorWrapper = styled.div`
  color: red;
  display: grid;
  font-size: 50px;
  min-width: 100vw;
  min-height: 100vh;
  place-items: center;
`;

export default function Fallback() {
  return (
    <ErrorWrapper>
      <h1>Page 404 Not Found</h1>
    </ErrorWrapper>
  );
}
