import { gql } from "@apollo/client";

const posts_subscription = gql`
  subscription {
    newPost {
      id
      title
      content
    }
  }
`;

export default posts_subscription;
