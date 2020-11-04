import styled from "styled-components";

export default styled.div`
  background: #999;
  padding: 5px;
  border-radius: 10px;
  font-size: 1em;
  margin: 5px auto;
  display: grid;
  grid-template-columns: minmax(150px, 1fr) 5fr;
`;

export const Title = styled.p``;

export const User = styled.span`
  font-size: 0.9rem;
  color: greenyellow;
`;

export const Avatar = styled.div`
  align-self: center;
  & > img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentBody = styled.div`
  background: gray;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 9px;
`;
