import React, { useState } from 'react';
import OneInput from './OneInput.jsx';
import AddItem from './AddItem.jsx';

export default function Items({ groupArray, setItemsArray }) {
  // State
  const [itemNameLocal, setItemNameLocal] = useState('');
  const [itemPriceLocal, setItemPriceLocal] = useState('');
  const [itemArrayLocal, setItemArrayLocal] = useState([]);

  const getItemNameInput = (name) => {
    setItemNameLocal(name);
  };
  const getItemPriceInput = (price) => {
    setItemPriceLocal(Number(price));
  };

  // Everytime a new item is added, update itemArrayLocal State
  const addItem = () => {
    const newItemData = {
      name: itemNameLocal,
      price: itemPriceLocal,
      sharing: [],
    };
    const updateItemsArray = [...itemArrayLocal, newItemData];
    setItemArrayLocal(updateItemsArray);
  };

  // Everytime an edit is made on an already added item, update itemArrayLocal State && the parent state
  const updatedItemsArray = (updatedItem) => {
    const newItemsArray = [...itemArrayLocal];
    newItemsArray[updatedItem.id] = updatedItem;
    setItemArrayLocal(newItemsArray);
    setItemsArray(newItemsArray);
  };

  return (

    <div className="container">
      <div className="row">
        <h1>ADD ITEM</h1>
        <div className="col">
          <OneInput inputTitle="Add Item:" getInputData={getItemNameInput} />
          <OneInput inputTitle="Add Price:" getInputData={getItemPriceInput} />
          <button type="button" onClick={addItem}>Add Item</button>
        </div>
      </div>

      <div className="row">
        <h1>ITEMS LIST</h1>
        {itemArrayLocal.map((item, index) => <AddItem key={index} groupArray={groupArray} item={item} updatedItemsArray={updatedItemsArray} index={index} />)}
      </div>
    </div>
  );
}
