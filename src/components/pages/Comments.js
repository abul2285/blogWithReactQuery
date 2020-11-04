import request, { gql } from "graphql-request";
import React from "react";
import { usePaginatedQuery } from "react-query";
import Comment from "../comments/Comment";
import styled from "styled-components";
import { useParams } from "react-router";

const fetchComment = async (key, id) => {
  const { post } = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      query post($postId: ID!) {
        post(postId: $postId) {
          id
          title
          body
          author {
            name
            id
          }
          comments {
            body
            author {
              name
              id
            }
            id
          }
        }
      }
    `,
    {
      postId: id,
    }
  );
  return post;
};
const PostComment = styled.div``;
export default function Comments() {
  const { postId } = useParams();
  console.log(postId);
  const { data, status } = usePaginatedQuery(
    ["comments", +postId],
    fetchComment
  );
  return (
    <>
      {status === "loading" && <h1>loading....</h1>}
      {status === "error" && <h1>loading....</h1>}
      {status === "success" && (
        <PostComment>
          {data.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={postId} />
          ))}
        </PostComment>
      )}
    </>
  );
}
