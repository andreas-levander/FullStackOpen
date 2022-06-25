import { useQuery } from "@apollo/client";
import { CURRENT_USER, ALL_BOOKS_GENRE } from "../queries";
import { useState, useEffect } from "react";

const Recommended = () => {
  const result = useQuery(CURRENT_USER);
  const [genre, setGenre] = useState("");
  const books_genre = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre },
  });

  useEffect(() => {
    if (result.data) {
      const user = result.data.me;
      setGenre(user.favouriteGenre);
    }
  }, [result.data]); // eslint-disable-line

  if (books_genre.loading) return <div>loading...</div>;

  const books = books_genre.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
