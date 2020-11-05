import styled from "styled-components";

export const PostsStyled = styled.div`
  display: grid;
  grid-template-columns: minmax(500px, 800px);
  justify-content: center;
  background: #999;
  max-width: 850px;
  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 20px;
`;

export const Pagination = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
  background: transparent;
  & > button {
    padding: 8px 12px;
    border: none;
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
