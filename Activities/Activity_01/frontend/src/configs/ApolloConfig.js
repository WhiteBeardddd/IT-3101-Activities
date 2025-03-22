import {ApolloClient, InMemoryCache, HttpLink, split} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from  'graphql-ws';

const websocket_url = 'ws://localhost:4002/graphql';
const http_url = 'http://localhost:4002/graphql';

const ws_link = new GraphQLWsLink(createClient({
  url: websocket_url,
  lazy: true,
  on: {
    error: (err) => console.error(err),
    open: () => console.log('WS connection established'),
    close: () => console.log('WS connection closed'),
  },
}));

const http_link = new HttpLink({uri: http_url});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  ws_link,
  http_link,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;



