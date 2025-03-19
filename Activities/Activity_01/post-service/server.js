const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { PubSub } = require('graphql-subscriptions');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const prisma = new PrismaClient();
const pubsub = new PubSub();

const typeDefs = gql`
  type Post {
    id: Int!
    title: String!
    content: String!
  }

  type Query {
    posts: [Post]
    post(id: Int!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: Int!, title: String, content: String): Post
    deletePost(id: Int!): Post
  }

  type Subscription {
    newPost: Post!
  }
`;

const resolvers = {
  Query: {
    posts: () => prisma.post.findMany(),
    post: (_, { id }) => prisma.post.findUnique({ where: { id } }),
  },
  Mutation: {
    createPost: async (_, { title, content }) => {
      const newPost = await prisma.post.create({ data: { title, content } });
      pubsub.publish('NEW_POST', { newPost });
      return newPost;
    },
    updatePost: (_, { id, title, content }) =>
      prisma.post.update({ where: { id }, data: { title, content } }),
    deletePost: (_, { id }) => prisma.post.delete({ where: { id } }),
  },
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator(['NEW_POST']),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
});

const httpServer = createServer((req, res) => {
  res.writeHead(404);
  res.end();
});

server.applyMiddleware({ app: httpServer });

httpServer.listen({ port: 4002 }, () => {
  console.log(`Posts service running at http://localhost:4002${server.graphqlPath}`);

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: httpServer,
      path: '/subscriptions',
    }
  );
});