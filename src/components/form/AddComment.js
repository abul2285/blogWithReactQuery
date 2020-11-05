import request, { gql } from "graphql-request";
import React, { useState } from "react";
import { useMutation, useQueryCache } from "react-query";
import { FormWrapper, StyledInput, StyledForm, Submit } from "./form.styled";

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

  const [submitComment, {}] = useMutation(addComment, {
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
      cache.setQueryData(["comments", +id], [...tempData]);
    },
  });
  const formSubmit = (e) => {
    e.preventDefault();
    body &&
      submitComment({
        userId: 1,
        body,
        postId: 1,
      });
    setBody("");
    clickToShow(false);
  };

  return (
    <FormWrapper>
      <StyledForm onSubmit={formSubmit}>
        <StyledInput
          type="text"
          value={body}
          name="body"
          placeholder="Body"
          autoComplete="off"
          onChange={(e) => setBody(e.target.value)}
        />
        <Submit type="submit">Submit</Submit>
      </StyledForm>
    </FormWrapper>
  );
}
