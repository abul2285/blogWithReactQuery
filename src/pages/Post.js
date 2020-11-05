import React from "react";
import request from "graphql-request";
import styled from "styled-components";
import { useParams } from "react-router";
import { usePaginatedQuery } from "react-query";

import Error from "../components/error/Error";
import Loading from "../components/loading/Loading";
import Comment from "../components/comments/Comment";
import { EndPoint, GetPostQuery } from "../graphql/query";

const fetchPost = async (key, id) => {
  const { post } = await request(EndPoint, GetPostQuery, {
    postId: id,
  });
  return post;
};

const PostBody = styled.div`
  padding: 30px;
  align-self: start;
  background: white;
  border-radius: 10px;
`;

const PostWrapper = styled.div`
  display: grid;
  padding: 30px;
  grid-gap: 10px;
  background: #999;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
`;

const PostComment = styled.div``;
export default function Post() {
  const { postId } = useParams();
  const { data, status } = usePaginatedQuery(["post", +postId], fetchPost);
  return (
    <>
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {status === "success" && (
        <>
          <PostWrapper>
            <PostBody>
              <h2>{`${data.title}`.toUpperCase()}</h2>
              <p>
                {data.body}
                {data.body}
                {data.body}
              </p>
              <p>
                {data.body}
                {data.body}
                {data.body}
              </p>
              <p>
                {data.body}
                {data.body}
                {data.body}
              </p>
            </PostBody>
            <PostComment>
              {data.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                  post={data}
                />
              ))}
            </PostComment>
          </PostWrapper>
        </>
      )}
    </>
  );
}
