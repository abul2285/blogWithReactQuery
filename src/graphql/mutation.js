const { gql } = require("graphql-request");

export const DeleteCommentMutation = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;

export const AddCommentMutation = gql`
  mutation addComment($data: CommentInput!) {
    addComment(data: $data) {
      id
    }
  }
`;

export const AddPostMutation = gql`
  mutation addPost($data: PostInput!) {
    addPost(data: $data) {
      id
      body
      title
      comments {
        body
      }
      author {
        name
      }
    }
  }
`;

export const DeletePostMutation = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;
