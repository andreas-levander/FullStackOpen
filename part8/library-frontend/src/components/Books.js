import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS_GENRE } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>loading...</div>;

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre: <b>{genre}</b>
        </p>
      )}

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
      <div>
        <GenreButton label="action" setGenre={setGenre} />
        <GenreButton label="patterns" setGenre={setGenre} />
        <GenreButton label="design" setGenre={setGenre} />
        <GenreButton label="devops" setGenre={setGenre} />
        <button onClick={() => setGenre("")}>all genres</button>
      </div>
    </div>
  );
};

const GenreButton = ({ label, setGenre }) => (
  <button onClick={() => setGenre(label)}>{label}</button>
);

export default Books;
