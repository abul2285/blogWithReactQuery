import React, { useEffect } from "react";
import { usePaginatedQuery, useQuery } from "react-query";
import { request, gql } from "graphql-request";
import Post from "../post/Post";
import AddPost from "../form/AddPost";

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

function PostsPage() {
  const { data, resolvedData, latestData, status } = usePaginatedQuery(
    "posts",
    fetchData
  );
  useEffect(() => {
    console.log(data, resolvedData, latestData);
  }, []);

  return (
    <>
      {status === "loading" && <h1>loading....</h1>}
      {status === "error" && <h1>loading....</h1>}
      {status === "success" && (
        <>
          <AddPost />
          {data.data.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </>
      )}
    </>
  );
}

export default PostsPage;
