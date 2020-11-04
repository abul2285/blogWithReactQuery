import React, { useEffect, useState } from "react";
import { usePaginatedQuery, useQuery, useQueryCache } from "react-query";
import { request, gql } from "graphql-request";
import Post from "../post/Post";
import AddPost from "../form/AddPost";
import { InputPlus } from "../Nav/Nav";

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
  const [showForm, setShowForm] = useState(false);
  const { status } = usePaginatedQuery("posts", fetchData);
  const cache = useQueryCache();
  let data = cache.getQueryData(["posts"]);
  console.log(data, status);
  useEffect(() => {}, []);
  console.log(data, status);
  return (
    <>
      {status === "loading" && <h1>loading....</h1>}
      {status === "error" && <h1>loading....</h1>}
      {status === "success" && (
        <>
          {!showForm && <InputPlus clickToShow={setShowForm} />}

          {showForm && <AddPost clickToShow={setShowForm} />}
          {data.data.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </>
      )}
    </>
  );
}

export default PostsPage;
