import { useQuery } from "@apollo/client";
import React from "react";
import { getMoviesQuery } from "../queries/Queries";

function MovieList() {
  const { loading, error, data } = useQuery(getMoviesQuery);
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }

  const getMovies = data.movies.map((v, i, a) => {
    return (
      <ul className="movies" key={i}>
        <li>
          <h4>{v.title}</h4>
        </li>
        <p>{v.description}</p>
        <p>{v.year}</p>
        <ul className="movies-director">
          <li>
            <h4>Director</h4>
          </li>
          <p>{v.director.name}</p>
        </ul>
      </ul>
    );
  });

  return (
    <div className="movies-list">
      <h1>Movies</h1>
      {getMovies}
    </div>
  );
}

export default MovieList;
