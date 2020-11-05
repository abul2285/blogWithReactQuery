import React from "react";
import request from "graphql-request";
import { useParams } from "react-router";
import { usePaginatedQuery } from "react-query";

import Error from "../components/error/Error";
import Loading from "../components/loading/Loading";
import Comment from "../components/comments/Comment";
import { EndPoint, GetPostQuery } from "../graphql/query";
import { PostBody, PostComment, PostWrapper } from "../styles/post.styled";

const fetchPost = async (key, id) => {
  const { post } = await request(EndPoint, GetPostQuery, {
    postId: id,
  });
  return post;
};

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
              <h2>Comments..</h2>
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
