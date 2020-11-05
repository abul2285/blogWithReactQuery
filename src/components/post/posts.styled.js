import styled from "styled-components";

export const Comments = styled.span`
  & > a {
    &:link {
      color: blue;
    }
    &:visited {
      color: black;
    }
    &:hover {
      color: white;
    }
  }
`;

export const ViewCount = styled.div`
  color: black;
  display: flex;
  & > svg {
    margin-right: 10px;
  }
`;

export const PostCommentWrapper = styled.div`
  display: flex;
  margin-right: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default styled.div`
  background: #eed;
  border: 1px solid transparent;
  padding: 5px;
  border-radius: 8px;
  font-size: 1em;
  margin: 30px auto;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: minmax(100px, 1fr) 10fr;
  &:hover {
    background: #eeeeef;
    border: 1px solid #ddd;
  }
`;

export const Title = styled.p`
  & > a {
    &:link {
      color: black;
    }
    &:visited {
      color: orange;
    }
    &:hover {
      color: blue;
    }
  }
`;

export const User = styled.span`
  font-size: 0.9rem;
  color: greenyellow;
`;

export const Avatar = styled.div`
  & > img {
    border-radius: 10%;
    width: 100%;
    height: 100%;
    object-fit: contain;
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
  margin: 2px;
  cursor: pointer;
  font-size: 16px;
  background: #ddd;
  &:hover {
    color: white;
    background: #222;
    & > a:link {
      color: white;
    }
  }
  & > a:link {
    color: black;
  }
`;
