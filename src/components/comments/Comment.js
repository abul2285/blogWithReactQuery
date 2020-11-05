import React from "react";
import request from "graphql-request";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import { EndPoint } from "../../graphql/query";
import { useMutation, useQueryCache } from "react-query";
import { DeleteCommentMutation } from "../../graphql/mutation";
import CommentWrapper, {
  Avatar,
  CommentBody,
  Title,
  User,
  Button,
} from "./comment.styled";
import { Body } from "../post/posts.styled";

const mutationDeleteComment = async (id) => {
  const data = await request(EndPoint, DeleteCommentMutation, {
    ...id,
  });
  return data;
};

export default function Comment({ comment, postId, post }) {
  const cache = useQueryCache();
  let data = cache.getQueryData(["comments", +postId]);

  if (!data) {
    data = cache.getQueryData(["post", +postId]);
  }

  const [commentDelete] = useMutation(mutationDeleteComment, {
    onSuccess: ({ deleteComment: { id } }) => {
      let commentData = data;

      if (!Array.isArray(data)) {
        commentData = [...data.comments];
      }

      let tempData = commentData.filter((item) => item.id !== id);

      Array.isArray(data)
        ? cache.setQueryData(["comments", +postId], [...tempData])
        : cache.setQueryData(["post", +postId], {
            ...data,
            comments: [...tempData],
          });
    },
  });

  const handleDelete = () => {
    commentDelete({
      commentId: comment.id,
    });
  };

  return (
    <CommentWrapper>
      <Avatar>
        <img src={`https://i.pravatar.cc/100?u=${comment.author.id}`} alt="" />
      </Avatar>
      <CommentBody>
        <Title>{comment.body}</Title>
        <Body>
          <User>
            <Link to={`/users/${comment.author.id}`}>
              {comment.author.name}
            </Link>
          </User>
          <Button onClick={handleDelete}>
            <FaTrash />
          </Button>
        </Body>
      </CommentBody>
    </CommentWrapper>
  );
}
