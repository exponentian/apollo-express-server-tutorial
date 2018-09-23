import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Auth {
    id: ID
    username: String
    token: String
  }

  type User {
    id: ID
    username: String
    password: String
    articles: [Article]
  }

  type Article {
    id: ID
    text: String
    user: User
  }

  type Query {
    readUsers: [User]
    readUser(id: ID!): User
    readArticles: [Article]
  }

  type Mutation {
    signup(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createArticle(text: String!, user: String!): Article
  }
`;

export default typeDefs;