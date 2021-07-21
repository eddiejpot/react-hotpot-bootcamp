import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/cookie.mjs';
import checkIfStringContainsNumbers from '../../utils/checkIfStringContainsNumbers.mjs';

export default function EditGroup({ groupArray, setGroupArray }) {
  const [nameLocal, setNameLocal] = useState('');

  const checkName = (event) => {
    const userInput = event.target.value;
    // condition check if user input contains numbers
    if (checkIfStringContainsNumbers(userInput)) {
      console.log('person name cannot have numbers');
    }
    setNameLocal(userInput);
  };

  // add person to groupArray
  const addMemberData = async () => {
    const addMember = {
      name: nameLocal,
      billId: getCookie('billId'),
    };
    // create member data in DB
    const { data: newlyAddedMember } = await axios.post('/api/people', addMember);
    // // update parent state
    const newGroup = [...groupArray, newlyAddedMember];
    setGroupArray(newGroup);
    // clear input field
    document.querySelector('.add-member-input').value = '';
  };

  return (
    <div className="container">
      <div className="row">
        <h1>ADD MEMBERS</h1>
        <div>
          <p>Name:</p>
          <input type="text" className="add-member-input" onChange={checkName} />
          <button type="button" onClick={addMemberData}>Add</button>
        </div>

      </div>

      <div className="row">
        <h1>CURRENT MEMBERS</h1>
        <ul>
          {groupArray.map((member) => <li key={member.id}>{member.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
