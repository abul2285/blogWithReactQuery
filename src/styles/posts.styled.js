import styled from "styled-components";

export const PostsStyled = styled.div`
  background: #eee;
  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
`;

export const Pagination = styled.div`
  display: flex;
  width: 120px;
  justify-content: space-between;
  background: transparent;
  & > button {
    padding: 8px 12px;
    border: none;
    background: green;
    cursor: pointer;
    &:focus {
    }
    &:hover {
      background: #333;
    }
    &:disabled {
      background: transparent;
      cursor: not-allowed;
      border: 1px solid red;
      color: red;
    }
  }
`;
