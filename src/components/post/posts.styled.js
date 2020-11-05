import styled from "styled-components";

export const Comments = styled.span``;

export const ViewCount = styled.p`
  color: yellow;
`;

export default styled.div`
  background: #888;
  border: 1px solid #975;
  padding: 5px;
  border-radius: 8px;
  font-size: 1em;
  margin: 5px auto;
  display: grid;
  grid-gap: 10px;
  position: relative;
  overflow: hidden;
  grid-template-columns: minmax(150px, 1fr) 5fr;
  &:hover {
    background: #777;
    button {
      display: block;
    }
  }
`;

export const Title = styled.p``;

export const User = styled.span`
  font-size: 0.9rem;
  color: greenyellow;
`;

export const Avatar = styled.div`
  & > img {
    border-radius: 10%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostBody = styled.div`
  padding: 5px 10px;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 6px 12px;
  border: none;
  display: none;
  position: absolute;
  right: 0px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
  color: red;
  font-size: 16px;
  background: black;
`;
