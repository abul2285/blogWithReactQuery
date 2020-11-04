import React from "react";
import { Link } from "react-router-dom";
import PostWrapper, {
  Avatar,
  Comments,
  Title,
  ViewCount,
  PostBody,
} from "./posts.styled";

export default function Post({ post }) {
  console.log(post);
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
    </PostWrapper>
  );
}
