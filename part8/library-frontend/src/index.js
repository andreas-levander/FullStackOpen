import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { onError } from "apollo-link-error";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.log("gcl error", graphQLErrors);
  if (networkError) console.log("network error", networkError);
});

const httplink = new HttpLink({ uri: "http://localhost:4000" });

const link = ApolloLink.from([errorlink, httplink]);

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
