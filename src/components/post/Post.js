import request, { gql } from "graphql-request";
import React from "react";
import { useMutation, useQueryCache } from "react-query";
import { Link, useParams } from "react-router-dom";
import PostWrapper, {
  Avatar,
  Comments,
  Title,
  ViewCount,
  PostBody,
} from "./posts.styled";

const deletePost = async (id) => {
  const { post } = await request(
    "https://api.graphqlplaceholder.com/",
    gql`
      mutation deletePost($postId: ID!) {
        deletePost(postId: $postId) {
          id
        }
      }
    `,

    {
      ...id,
    }
  );
  return post;
};

export default function Post({ post, user }) {
  const cache = useQueryCache();
  let data;
  const { userId } = useParams();
  if (userId) {
    ({ posts: data } = cache.getQueryData(["user", +post.author.id]));
  } else {
    ({ data } = cache.getQueryData(["posts"]));
  }
  const [postDelete, { status }] = useMutation(deletePost, {
    onSuccess: () => {
      console.log(data);
      let tempData = data.filter((item) => item.id != post.id);
      !userId
        ? cache.setQueryData("posts", { data: [...tempData] })
        : cache.setQueryData(["user", +post.author.id], {
            ...user,
            posts: [...tempData],
          });
    },
  });
  const handleDelete = (id) => {
    console.log(id);
    postDelete({
      postId: +id,
    });
    console.log(status);
  };
  return (
    <PostWrapper>
      <Avatar>
        <img src={`https://i.pravatar.cc/100?u=${post.author.id}`} alt="" />
      </Avatar>
      <PostBody>
        <Title>
          <Link to={`/posts/${post.id}`}>{post.title || post.body}</Link>
        </Title>
        <Comments>
          <Link to={`/posts/${post.id}/comments`}>
            {post.comments.length} Comment
          </Link>
        </Comments>
        <ViewCount>{~~((Math.random() + 1) * 10)}</ViewCount>
      </PostBody>
      <button onClick={() => handleDelete(post.id)}>delete</button>
    </PostWrapper>
  );
}
