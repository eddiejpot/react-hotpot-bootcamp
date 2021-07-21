import React, { useState } from 'react';

export default function AddItem({
  groupArray, item, updatedItemsArray, index,
}) {
  const updateItemArray = (event) => {
    // store which boxes are checked
    const arrOfCheckboxes = event.target.parentElement.parentElement.childNodes;
    const checkBoxArr = Array.from(arrOfCheckboxes)
      .filter((check) => check.nodeName === 'DIV')
      .filter((check) => check.firstChild.checked)
      .map((checkbox) => Number(checkbox.firstChild.value));

    const updatedItem = {
      id: index,
      name: item.name,
      price: item.price,
      sharing: checkBoxArr,
    };

    updatedItemsArray(updatedItem);
  };

  return (
    <div className="row">
      <div className="col">
        <p>
          Item:
          <span>{item.name}</span>
        </p>
      </div>
      <div className="col">
        <p>
          Price
          <span>{item.price}</span>
        </p>
      </div>
      <div className="col">
        <p>Who is sharing</p>
        {
          groupArray.map((person) => (
            <div key={person.id}>
              <input type="checkbox" id="person" name="person" value={person.id} onChange={updateItemArray} />
              <label htmlFor="item">{person.name}</label>
            </div>
          ))
        }
      </div>
    </div>
  );
}
