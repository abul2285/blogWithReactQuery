import React, { useEffect, useState } from "react";
import { usePaginatedQuery, useQuery, useQueryCache } from "react-query";
import { request, gql } from "graphql-request";
import Post from "../post/Post";
import AddPost from "../form/AddPost";
import { InputPlus } from "../Nav/Nav";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const fetchData = async () => {
  const { posts } = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      query {
        posts(pagination: { limit: 30 }) {
          count
          data {
            title
            id
            comments {
              author {
                name
                id
              }
            }
            author {
              name
              id
            }
          }
        }
      }
    `
  );
  return posts;
};

export const PostsStyled = styled.div`
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

function PostsPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { status } = usePaginatedQuery("posts", fetchData);
  const cache = useQueryCache();
  let data = cache.getQueryData(["posts"]);
  useEffect(() => {}, []);
  return (
    <>
      {status === "loading" && <h1>loading....</h1>}
      {status === "error" && <h1>loading....</h1>}
      {status === "success" && (
        <>
          {!showForm && (
            <InputPlus clickToShow={setShowForm}>
              <FaPlus />
              <small>Add Post</small>
            </InputPlus>
          )}

          {showForm && <AddPost clickToShow={setShowForm} />}
          <PostsStyled>
            {data.data.map((post) => (
              <Post post={post} key={post.id} />
            ))}
            <button
              onClick={() => setCurrentPage((currentPage) => ++currentPage)}
              disabled={currentPage === 10}
            >
              next
            </button>
            <button
              onClick={() => setCurrentPage((currentPage) => --currentPage)}
              disabled={currentPage == 1}
            >
              prev
            </button>
          </PostsStyled>
        </>
      )}
    </>
  );
}

export default PostsPage;
