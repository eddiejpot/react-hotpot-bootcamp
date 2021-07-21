import React, { useState } from 'react';

export default function OneInput({ inputTitle, getInputData }) {
  const inputData = (event) => {
    getInputData(event.target.value);
  };

  return (
    <>
      <p>{inputTitle}</p>
      <input type="text" onChange={inputData} />
    </>
  );
}
