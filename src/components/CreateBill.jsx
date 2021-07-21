import React, { useState } from 'react';
import checkIfStringContainsNumbers from '../../utils/checkIfStringContainsNumbers.mjs';

export default function CreateBill({ createBill }) {
  const [billNameLocal, setBillNameLocal] = useState('test');

  const checkBillName = (event) => {
    const userInput = event.target.value;
    // condition check if user input contains numbers
    if (checkIfStringContainsNumbers(userInput)) {
      console.log('bill name cannot have numbers');
    }
    else {
      setBillNameLocal(userInput);
    }
  };

  return (
    <div className="Create-bill">
      <h1>Create Bill</h1>
      <div>
        <p>Name of bill:</p>
        <input type="text" onChange={checkBillName} />
      </div>
      <button type="button" onClick={() => createBill(billNameLocal)}>Create Bill</button>
    </div>
  );
}
