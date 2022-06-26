import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      born
      id
      bookCount
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`;

export const CURRENT_USER = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`;

export const ALL_BOOKS_GENRE = gql`
  query books_by_genre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      id
      published
    }
  }
`;

// prettier-ignore
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
