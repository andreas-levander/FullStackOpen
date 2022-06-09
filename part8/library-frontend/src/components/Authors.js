import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>loading...</div>;

  const updateAuthor = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: name.value, setBornTo: Number(born) } });
  };

  const authors = result.data.allAuthors;

  const authorNames = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={updateAuthor}>
          <div>
            <Select
              defaultValue={name}
              onChange={setName}
              options={authorNames}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
