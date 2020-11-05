import React from "react";
import request from "graphql-request";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryCache } from "react-query";

import { EndPoint } from "../../graphql/query";
import { DeletePostMutation } from "../../graphql/mutation";
import PostWrapper, {
  Avatar,
  Comments,
  Title,
  ViewCount,
  PostBody,
  Button,
  PostCommentWrapper,
  ButtonWrapper,
  Body,
} from "./posts.styled";

const mutationDeletePost = async (id) => {
  const { post } = await request(EndPoint, DeletePostMutation, {
    ...id,
  });
  return post;
};

export default function Post({ post, user }) {
  let data;
  const cache = useQueryCache();
  const { userId } = useParams();

  if (userId) {
    ({ posts: data } = cache.getQueryData(["user", +post.author.id]));
  } else {
    ({ data } = cache.getQueryData(["posts", +post.author.id]));
  }

  const [postDelete] = useMutation(mutationDeletePost, {
    onSuccess: () => {
      let tempData = data.filter((item) => item.id !== post.id);
      !userId
        ? cache.setQueryData(["posts", +post.author.id], {
            data: [...tempData],
          })
        : cache.setQueryData(["user", +post.author.id], {
            ...user,
            posts: [...tempData],
          });
    },
  });
  const handleDelete = (id) => {
    postDelete({
      postId: +id,
    });
  };
  return (
    <PostWrapper>
      <Avatar>
        <img src={`https://i.pravatar.cc/100?u=${post.author.id}`} alt="" />
      </Avatar>

      <PostBody>
        <Title>{post.title || post.body}</Title>
        <Body>
          <PostCommentWrapper>
            <Comments>
              <Link to={`/posts/${post.id}/comments`}>
                {post.comments.length} Comment
              </Link>
            </Comments>
            <ViewCount>
              <FaEye size={20} />
              {~~((Math.random() + 1) * 10)}
            </ViewCount>
          </PostCommentWrapper>
          <ButtonWrapper>
            <Button>
              <Link to={`/posts/${post.id}`}>Read more</Link>
            </Button>
            <Button onClick={() => handleDelete(post.id)}>
              <FaTrash />
            </Button>
          </ButtonWrapper>
        </Body>
      </PostBody>
    </PostWrapper>
  );
}
