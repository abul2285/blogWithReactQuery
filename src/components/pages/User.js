import React from "react";
import User from "../user/User";
import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import Post from "../post/Post";
import { useParams } from "react-router";

const fetchUser = async (key, id) => {
  const { user } = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      query user($userId: Int!) {
        user(userId: $userId) {
          id
          name
          email
          phone
          website
          address {
            city
            street
            zipcode
          }
          company {
            name
            catchPhrase
            bs
          }
          posts {
            body
            id
            comments {
              body
            }
            author {
              id
            }
          }
        }
      }
    `,
    {
      userId: id,
    }
  );
  return user;
};

export default function UserPage() {
  const { userId } = useParams();
  console.log(userId);
  const { data, status } = useQuery(["user", +userId], fetchUser);
  // const { posts, ...userInfo } = data;
  console.log(data);
  return (
    <>
      {status === "loading" && <h1>loading....</h1>}
      {status === "error" && <h1>loading....</h1>}
      {status === "success" && (
        <>
          <User info={data} />
          {data.posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </>
      )}
    </>
  );
}
