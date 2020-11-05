import request from "graphql-request";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { usePaginatedQuery, useQueryCache } from "react-query";

import Error from "../components/error/Error";
import { InputPlus } from "../components/Nav/Nav";
import Loading from "../components/loading/Loading";
import Comment from "../components/comments/Comment";
import AddComment from "../components/form/AddComment";
import { EndPoint, GetCommentQuery } from "../graphql/query";

const fetchComment = async () => {
  const {
    comments: { data },
  } = await request(EndPoint, GetCommentQuery, {
    pagination: {
      limit: 800,
    },
  });
  return data;
};

const PostComment = styled.div`
  display: grid;
  grid-template-columns: minmax(500px, 800px);
  justify-content: center;
  background: #999;
  max-width: 850px;
  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 20px;
`;

export default function Comments() {
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const { status } = usePaginatedQuery(["comments", +postId], fetchComment);

  const cache = useQueryCache();
  const data = cache.getQueryData(["comments", +postId]);

  useEffect(() => {
    if (data) {
      const comments = data.filter((item) => item.post.id === postId);
      setComments([...comments]);
    }
  }, [postId, data]);

  return (
    <>
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {status === "success" && (
        <>
          {!showForm && (
            <InputPlus clickToShow={setShowForm}>
              <FaPlus />
              <small>Add Comments</small>
            </InputPlus>
          )}
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
