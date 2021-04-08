import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
const getMoviesQuery = gql`
  {
    directors {
      id
      name
      movies {
        title
      }
    }
  }
`;
function MovieList() {
  const [count, setCount] = useState(0);
  const { loading, error, data } = useQuery(getMoviesQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return (
    <div>
      <ul className="movie-list">
        <li>Lorem İpsum</li>
      </ul>
    </div>
  );
}

export default MovieList;
