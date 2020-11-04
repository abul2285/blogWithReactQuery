import request, { gql } from "graphql-request";
import React, { useState } from "react";
import { useMutation, useQueryCache } from "react-query";
import styled from "styled-components";

const StyledForm = styled.form``;
const StyledInput = styled.input``;

const addPost = async (data) => {
  const dataf = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      mutation addPost($data: PostInput!) {
        addPost(data: $data) {
          title
          id
          body
          comments {
            body
          }
          author {
            name
          }
        }
      }
    `,
    {
      data: { ...data },
    }
  );
  return dataf;
};

export default function AddPost({ clickToShow }) {
  const [{ title, body }, setPost] = useState({ title: "", body: "" });
  const cache = useQueryCache();
  let { data } = cache.getQueryData(["posts"]);

  const [submitPost, {}] = useMutation(addPost, {
    onSuccess: ({ addPost }) => {
      const tempData = [{ ...addPost, id: Date.now() }, ...data];
      cache.setQueryData("posts", { data: [...tempData] });
    },
  });
  const formSubmit = (e) => {
    e.preventDefault();
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
    <StyledForm onSubmit={formSubmit}>
      <StyledInput
        type="text"
        value={title}
        name="title"
        onChange={(e) => handleChange(e)}
      />
      <StyledInput
        type="text"
        value={body}
        name="body"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit">submit</button>
    </StyledForm>
  );
}
