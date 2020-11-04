import request, { gql } from "graphql-request";
import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

const StyledForm = styled.form``;
const StyledInput = styled.input``;

const addPost = async () => {
  const { post } = await request(
    "",
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
      userId: 1,
      title: "test title",
      body: "test body",
    }
  );
  return post;
};

export default function AddPost() {
  const [submitPost, { data }] = useMutation(addPost);
  console.log(data);
  const [{ title, body }, setPost] = useState({ title: "", body: "" });
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(title, body);
    setPost({ title: "", body: "" });
  };

  const handleChange = (e) => {
    console.log(e.target.name, "*********", e.target.value);
    submitPost();
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
