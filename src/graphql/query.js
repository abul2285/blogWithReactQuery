import { gql } from "graphql-request";

export const EndPoint = `https://api.graphqlplaceholder.com/`;

export const GetCommentQuery = gql`
  query comments($pagination: PaginationInput!) {
    comments(pagination: $pagination) {
      count
      data {
        id
        body
        author {
          id
          name
        }
        post {
          id
        }
      }
    }
  }
`;

export const GetPostQuery = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      id
      title
      body
      author {
        name
      }
      comments {
        body
        author {
          name
          id
        }
        id
      }
    }
  }
`;

export const GetPostsQuery = gql`
  query($pagination: PaginationInput) {
    posts(pagination: $pagination) {
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
`;

export const GetUserQuery = gql`
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
`;

export const GetUsersQuery = gql`
  query {
    users {
      data {
        name
        id
      }
    }
  }
`;
