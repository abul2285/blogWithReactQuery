import request, { gql } from "graphql-request";
import React, { useState } from "react";
import { useMutation, useQueryCache } from "react-query";
import styled from "styled-components";

const StyledForm = styled.form``;
const StyledInput = styled.input``;

const addComment = async (data) => {
  const dataf = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      mutation addComment($data: CommentInput!) {
        addComment(data: $data) {
          id
        }
      }
    `,
    {
      data: { ...data },
    }
  );
  return dataf;
};

export default function AddComment({ id, clickToShow }) {
  const [body, setBody] = useState("");
  const cache = useQueryCache();
  let data = cache.getQueryData(["comments", +id]);
  console.log(data, id);

  const [submitPost, {}] = useMutation(addComment, {
    onError: ({ addComment }) => {
      const tempData = [
        {
          body,
          userId: 1,
          postId: 1,
          id: Date.now(),
          post: { id },
          author: { id, name: "Leanne Graham" },
        },
        ...data,
      ];
      console.log(tempData);
      cache.setQueryData(["comments", +id], [...tempData]);
    },
  });
  const formSubmit = (e) => {
    e.preventDefault();
    submitPost({
      userId: 1,
      body,
      postId: 1,
    });
    setBody("");
    clickToShow(false);
  };

  return (
    <StyledForm onSubmit={formSubmit}>
      <StyledInput
        type="text"
        value={body}
        name="body"
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">submit</button>
    </StyledForm>
  );
}
