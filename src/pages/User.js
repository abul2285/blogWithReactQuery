import React from "react";
import request from "graphql-request";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import User from "../components/user/User";
import Post from "../components/post/Post";
import Error from "../components/error/Error";
import Loading from "../components/loading/Loading";
import { PostsStyled } from "../styles/posts.styled";
import { EndPoint, GetUserQuery } from "../graphql/query";

const fetchUser = async (key, id) => {
  const { user } = await request(EndPoint, GetUserQuery, {
    userId: id,
  });
  return user;
};

export default function UserPage() {
  const { userId } = useParams();
  const { data, status } = useQuery(["user", +userId], fetchUser);
  return (
    <>
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {status === "success" && (
        <>
          <User info={data} />
          <PostsStyled>
            <h2>Posts..</h2>
            {data.posts.map((post) => (
              <Post post={post} user={data} key={post.id} />
            ))}
          </PostsStyled>
        </>
      )}
    </>
  );
}
