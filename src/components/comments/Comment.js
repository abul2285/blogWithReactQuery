import request, { gql } from "graphql-request";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryCache } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Button } from "../post/posts.styled";
import CommentWrapper, {
  Avatar,
  CommentBody,
  Title,
  User,
} from "./comment.styled";

const deleteComment = async (id) => {
  const data = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      mutation deleteComment($commentId: ID!) {
        deleteComment(commentId: $commentId) {
          id
        }
      }
    `,

    {
      ...id,
    }
  );
  return data;
};

export default function Comment({ comment, postId, post }) {
  const cache = useQueryCache();
  let data = cache.getQueryData(["comments", +postId]);
  if (!data) {
    data = cache.getQueryData(["post", +postId]);
  }
  const [commentDelete, { status }] = useMutation(deleteComment, {
    onSuccess: ({ deleteComment: { id } }) => {
      let commentData = data;
      if (!Array.isArray(data)) {
        commentData = [...data.comments];
      }
      let tempData = commentData.filter((item) => item.id != id);
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
        <User>
          <Link to={`/users/${comment.author.id}`}>{comment.author.name}</Link>
        </User>
      </CommentBody>
      <Button onClick={handleDelete}>
        <FaTrash />
      </Button>
    </CommentWrapper>
  );
}
