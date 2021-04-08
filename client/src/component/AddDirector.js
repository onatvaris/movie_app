import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { addDirectorQuery } from "../queries/Queries";

function AddDirector() {
  const [name, setname] = useState("");
  const [birth, setbirth] = useState("");
  const [addDirector, { data }] = useMutation(addDirectorQuery);

  const submitEvent = (e) => {
    e.preventDefault();
    if (!name) {
      alert("name  is required, but it was not provided. Try again");
    }
    addDirector({ variables: { name: name, birth: parseInt(birth) } }).then(
      (res) => {
        console.log(`res`, res);
        setname("");
        setbirth("");
      }
    );
  };

  return (
    <div>
      <form className="addForm" onSubmit={submitEvent}>
        <label className="label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(text) => setname(text.target.value)}
            name="name"
          />
        </label>
        <label className="label">
          birth:
          <input
            type="text"
            name="birth"
            value={birth}
            onChange={(text) => setbirth(text.target.value)}
          />
        </label>
        <input type="submit" value="Submit for Add Director" />
      </form>
    </div>
  );
}

export default AddDirector;
