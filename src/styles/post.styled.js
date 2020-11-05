import styled from "styled-components";

export const PostBody = styled.div`
  padding: 30px;
  align-self: start;
  background: white;
  border-radius: 10px;
`;

export const PostWrapper = styled.div`
  padding: 0 30px;
`;

export const PostComment = styled.div`
  & > * {
    margin-bottom: 30px;
  }
`;
