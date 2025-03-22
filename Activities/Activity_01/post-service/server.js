const express = require('express'); 
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PrismaClient } = require('@prisma/client');
const { PubSub } = require('graphql-subscriptions');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); // 🔥 Added to fetch users from users-service

const prisma = new PrismaClient();
const pubsub = new PubSub();
const app = express();

const USERS_SERVICE_URL = 'http://localhost:4001/graphql'; // 🔥 URL of users-service

const typeDefs = `#graphql
  type Post {
    id: ID!
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

/** 🔥 Function to fetch user details from users-service */
const fetchUser = async (userId) => {
  try {
    const response = await axios.post(USERS_SERVICE_URL, {
      query: `
        query GetUser($id: Int!) {
          user(id: $id) {
            id
            name
            email
          }
        }
      `,
      variables: { id: userId },
    });

    return response.data.data.user; // ✅ Extract user details
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return null; // Return null if request fails
  }
};

const resolvers = {
  Query: {
    posts: () => prisma.post.findMany(),
    post: (_, { id }) => prisma.post.findUnique({ where: { id } }),
  },
  Mutation: {
    createPost: async (_, { title, content, userId }) => {
      const newPost = await prisma.post.create({
        data: { title, content, userId }, // Ensure userId is included
      });
      pubsub.publish('NEW_POST', { newPost });
      return newPost;
    },
    updatePost: (_, { id, title, content }) =>
      prisma.post.update({ where: { id }, data: { title, content } }),
    deletePost: (_, { id }) => prisma.post.delete({ where: { id } }),
  },
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterableIterator(['NEW_POST']),
    },
  },
};


async function startServer() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const httpServer = http.createServer(app);

  // Set up WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({ schema }, wsServer);

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use(cors(), bodyParser.json(), expressMiddleware(server));

  httpServer.listen(4002, () => {
    console.log('Post Service running at http://localhost:4002/graphql');
  });
}

startServer();
