import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { onError } from "apollo-link-error";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/",
  })
);

const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.log("gcl error", graphQLErrors);
  if (networkError) console.log("network error", networkError);
});

const httplink = new HttpLink({ uri: "http://localhost:4000" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  ApolloLink.from([errorlink, authLink, httplink])
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
