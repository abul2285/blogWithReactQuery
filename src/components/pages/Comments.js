import request, { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { usePaginatedQuery, useQueryCache } from "react-query";
import Comment from "../comments/Comment";
import styled from "styled-components";
import { useParams } from "react-router";
import AddComment from "../form/AddComment";
import { InputPlus } from "../Nav/Nav";

const fetchComment = async (key, id) => {
  const {
    comments: { data },
  } = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      query comments($pagination: PaginationInput!) {
        comments(pagination: $pagination) {
          count
          data {
            body
            author {
              name
              id
            }
            id
            post {
              id
            }
          }
        }
      }
    `,
    {
      pagination: {
        limit: 800,
      },
    }
  );
  return data;
};
const PostComment = styled.div``;
export default function Comments() {
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const { status } = usePaginatedQuery(["comments", +postId], fetchComment);

  const cache = useQueryCache();
  const data = cache.getQueryData(["comments", +postId]);

  useEffect(() => {
    if (data) {
      console.log({ data, postId });
      const comments = data.filter((item) => item.post.id === postId);
      setComments([...comments]);
      console.log(comments);
    }
  }, [postId, data]);
  console.log(comments);

  return (
    <>
      {status === "loading" && <h1>loading....</h1>}
      {status === "error" && <h1>loading....</h1>}
      {status === "success" && (
        <>
          {!showForm && <InputPlus clickToShow={setShowForm} />}
          {showForm && <AddComment id={postId} clickToShow={setShowForm} />}
          <PostComment>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} postId={postId} />
            ))}
          </PostComment>
        </>
      )}
    </>
  );
}
