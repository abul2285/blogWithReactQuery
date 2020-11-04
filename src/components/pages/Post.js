import request, { gql } from "graphql-request";
import React from "react";
import { usePaginatedQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import Comment from "../comments/Comment";

const fetchPost = async (key, id) => {
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

const PostBody = styled.div`
  background: orange;
  padding: 30px;
  align-self: start;
  border-radius: 10px;
`;

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  padding: 30px;
  grid-gap: 10px;
  background: #300;
`;

const PostComment = styled.div``;
export default function Post() {
  const { postId } = useParams();
  const { data, status } = usePaginatedQuery(["post", +postId], fetchPost);
  console.log(data);
  return (
    <>
      {status === "loading" && <h1>loading....</h1>}
      {status === "error" && <h1>loading....</h1>}
      {status === "success" && (
        <>
          <PostWrapper>
            <PostBody>
              {data.body}
              <br />
              {data.body}
              <br />
              {data.body}
            </PostBody>
            <PostComment>
              {data.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} postId={postId} />
              ))}
            </PostComment>
          </PostWrapper>
        </>
      )}
    </>
  );
}
