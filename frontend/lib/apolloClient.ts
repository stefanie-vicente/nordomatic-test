import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_API_URI,
  }),
  cache: new InMemoryCache(),
});

export default client;
