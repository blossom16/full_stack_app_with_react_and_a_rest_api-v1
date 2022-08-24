import React from "react";

function ValidationError({ errors, title }) {
  if (errors.length) {
    return (
      <div className="validation--errors">
        <h3>{title}</h3>
        <ul>
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      </div>
    );
  }
  return null;
}

export default ValidationError;