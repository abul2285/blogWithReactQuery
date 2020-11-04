import request, { gql } from "graphql-request";
import React from "react";
import { useMutation, useQueryCache } from "react-query";
import { Link } from "react-router-dom";
import CommentWrapper, {
  Avatar,
  CommentBody,
  Title,
  User,
} from "./comment.styled";

const deleteComment = async (id) => {
  const com = await request(
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
  console.log(id);
  return com;
};

export default function Comment({ comment, postId }) {
  const cache = useQueryCache();
  let data = cache.getQueryData(["comments", +postId]);
  const [commentDelete, { status }] = useMutation(deleteComment, {
    onSuccess: ({ deleteComment: { id } }) => {
      let tempData = data.filter((item) => item.id != id);
      cache.setQueryData(["comments", +postId], [...tempData]);
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
      <button onClick={handleDelete}>delete</button>
    </CommentWrapper>
  );
}
