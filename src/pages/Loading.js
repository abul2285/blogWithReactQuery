import React from "react";
import styled from "styled-components";
import Spinner from "../components/spinner/Spinner";
import { ErrorWrapper } from "./Fallback";
const LoadingWrapper = styled(ErrorWrapper)`
  color: green;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
}
