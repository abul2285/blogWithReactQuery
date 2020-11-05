import styled from "styled-components";
import CommentWrapper, { PostBody } from "../post/posts.styled";

export default styled(CommentWrapper)``;

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

export const CommentBody = styled(PostBody)``;
