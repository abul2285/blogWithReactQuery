import request from "graphql-request";
import React, { useState } from "react";
import { useMutation, useQueryCache } from "react-query";

import { EndPoint } from "../../graphql/query";
import { AddPostMutation } from "../../graphql/mutation";
import { FormWrapper, StyledInput, StyledForm, Submit } from "./form.styled";

const mutationAddPost = async (data) => {
  const post = await request(EndPoint, AddPostMutation, {
    data: { ...data },
  });
  return post;
};

export default function AddPost({ clickToShow, postId }) {
  const cache = useQueryCache();
  const [{ title, body }, setPost] = useState({ title: "", body: "" });
  let { data } = cache.getQueryData(["posts", postId]);

  const [submitPost] = useMutation(mutationAddPost, {
    onSuccess: ({ addPost }) => {
      console.log(addPost);
      const tempData = [
        { ...addPost, id: Date.now(), author: { ...addPost.author, id: 1 } },
        ...data,
      ];
      cache.setQueryData(["posts", postId], { data: [...tempData] });
    },
  });

  const formSubmit = (e) => {
    e.preventDefault();

    title &&
      body &&
      submitPost({
        userId: 1,
        title,
        body,
      });

    setPost({ title: "", body: "" });

    clickToShow(false);
  };

  const handleChange = (e) => {
    setPost({
      title,
      body,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <FormWrapper>
      <StyledForm onSubmit={formSubmit}>
        <StyledInput
          type="text"
          value={title}
          name="title"
          placeholder="Title"
          autoComplete="off"
          onChange={(e) => handleChange(e)}
        />
        <StyledInput
          type="text"
          value={body}
          name="body"
          autoComplete="off"
          placeholder="Body"
          onChange={(e) => handleChange(e)}
        />
        <Submit type="submit">Submit</Submit>
        <Submit>Cancel</Submit>
      </StyledForm>
    </FormWrapper>
  );
}
