import { FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import { request } from "graphql-request";
import { usePaginatedQuery } from "react-query";

import Post from "../components/post/Post";
import Error from "../components/error/Error";
import AddPost from "../components/form/AddPost";
import { InputPlus } from "../components/Nav/Nav";
import Loading from "../components/loading/Loading";
import { EndPoint, GetPostsQuery } from "../graphql/query";
import { PostsStyled, Pagination } from "../styles/posts.styled";

const fetchPosts = async (key, page) => {
  const { posts } = await request(EndPoint, GetPostsQuery, {
    pagination: {
      limit: 10,
      page: page,
    },
  });
  return posts;
};

function PostsPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, status } = usePaginatedQuery(
    ["posts", currentPage],
    fetchPosts
  );

  return (
    <>
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {status === "success" && (
        <>
          {!showForm && (
            <InputPlus clickToShow={setShowForm}>
              <FaPlus />
              <small>Add Post</small>
            </InputPlus>
          )}

          {showForm && (
            <AddPost clickToShow={setShowForm} postId={currentPage} />
          )}
          <PostsStyled>
            {data.data.map((post) => (
              <Post post={post} key={post.id} />
            ))}
            <Pagination>
              <button
                onClick={() => setCurrentPage((currentPage) => --currentPage)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((currentPage) => ++currentPage)}
                disabled={currentPage === 10}
              >
                Next
              </button>
            </Pagination>
          </PostsStyled>
        </>
      )}
    </>
  );
}

export default PostsPage;
