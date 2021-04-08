import { useQuery } from "@apollo/client";
import React from "react";
import { getDirectorsQuery } from "../queries/Queries";

function DirectorList() {
  const { loading, error, data } = useQuery(getDirectorsQuery);
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }

  const getDirectors = data.directors.map((v, i, a) => {
    return (
      <ul key={i}>
        <li>Director Name</li>
        <p>{v.name}</p>
        <ul>
          <li>Movies</li>
          {v.movies.length !== 0 ? (
            v.movies.map((v, i, a) => {
              return <p key={i}>title : {v.title}</p>;
            })
          ) : (
            <p>Director dont have movie</p>
          )}
        </ul>
      </ul>
    );
  });

  return (
    <div className="director-list">
      <h1>Directors</h1>
      {getDirectors}
    </div>
  );
}

export default DirectorList;
