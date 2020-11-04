import React from "react";
import { Link } from "react-router-dom";
import CommentWrapper, {
  Avatar,
  CommentBody,
  Title,
  User,
} from "./comment.styled";

export default function Comment({ comment, postId }) {
  console.log(comment);
  return (
    <CommentWrapper>
      <Avatar>
        <img src={`https://i.pravatar.cc/100?u=${comment.author.id}`} alt="" />
      </Avatar>
      <CommentBody>
        <Title>{comment.body}</Title>
        <User>
          <Link to={`/users/${comment.author.id}`}>{comment.author.name}</Link>
        </User>
      </CommentBody>
    </CommentWrapper>
  );
}
