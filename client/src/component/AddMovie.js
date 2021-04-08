import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { addMovieQuery, getDirectorsQuery } from "../queries/Queries";

function AddMovie() {
  const { data, loading, error } = useQuery(getDirectorsQuery);
  const [addMovie] = useMutation(addMovieQuery);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [directorId, setdirectorId] = useState("");
  const [year, setyear] = useState("");
  if (loading) {
    console.log(loading);
    return null;
  }
  if (error) {
    console.log(error);
    return null;
  }

  const DirectorName = data.directors.map((v, i, a) => {
    return (
      <option value={v.id} key={i}>
        {v.name}
      </option>
    );
  });

  const submitEvent = (e) => {
    e.preventDefault();
    if (title === "" || directorId === "" || year === "") {
      alert("title,year,director are required, but it was not provided.");
    } else {
      addMovie({
        variables: {
          title: title,
          description: description,
          year: parseInt(year),
          directorId: directorId,
        },
      }).then((res) => {
        console.log(`res`, res);
        setdescription("");
        setdirectorId("");
        settitle("");
        setyear("");
      });
    }
  };

  return (
    <div>
      <form className="addForm" onSubmit={submitEvent}>
        <label className="label">
          Title:
          <input
            type="text"
            value={title}
            onChange={(text) => settitle(text.target.value)}
            name="title"
          />
        </label>
        <label className="label">
          Description:
          <input
            type="text"
            name="birth"
            value={description}
            onChange={(text) => setdescription(text.target.value)}
          />
        </label>
        <label className="label">
          Year:
          <input
            type="text"
            name="year"
            value={year}
            onChange={(text) => setyear(text.target.value)}
          />
        </label>
        <label className="label">
          Director:
          <select
            name="directorId"
            id="directorId"
            onChange={(e) => {
              console.log(e.target.value);
              setdirectorId(e.target.value);
            }}
          >
            <option value="">Directros</option>
            {DirectorName}
          </select>
        </label>
        <input type="submit" value="Submit for Add Director" />
      </form>
    </div>
  );
}

export default AddMovie;
