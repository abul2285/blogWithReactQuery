import styled from "styled-components";

export default styled.div`
  padding: 5px;
  border-radius: 8px;
  font-size: 1em;
  margin: 10px auto;
  display: grid;
  grid-gap: 50px;
  overflow: hidden;
  background: #eee;
  grid-template-columns: minmax(100px, 1fr) 10fr;
`;

export const Title = styled.p`
  color: #111;
`;

export const User = styled.span`
  font-size: 0.9rem;

  & > a {
    &:link {
      color: red;
    }
    &:visited {
      color: black;
    }
    &:hover {
      color: blue;
    }
  }
`;

export const Avatar = styled.div`
  align-self: center;
  & > img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CommentBody = styled.div`
  padding: 5px 10px;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Button = styled.button`
  padding: 6px 12px;
  border: none;
  color: red;
  &:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`;
