import request from "graphql-request";
import React, { useState } from "react";
import { useMutation, useQueryCache } from "react-query";

import { EndPoint } from "../../graphql/query";
import { AddCommentMutation } from "../../graphql/mutation";
import { FormWrapper, StyledInput, StyledForm, Submit } from "./form.styled";

const mutationAddComment = async (data) => {
  const comments = await request(EndPoint, AddCommentMutation, {
    data: { ...data },
  });
  return comments;
};

export default function AddComment({ id, clickToShow }) {
  const cache = useQueryCache();
  const [body, setBody] = useState("");
  let data = cache.getQueryData(["comments", +id]);

  const [submitComment] = useMutation(mutationAddComment, {
    onError: () => {
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
        <Submit>Cancel</Submit>
      </StyledForm>
    </FormWrapper>
  );
}
