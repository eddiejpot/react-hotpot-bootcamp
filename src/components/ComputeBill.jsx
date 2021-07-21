import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/cookie.mjs';

export default function ComputeBill({ itemsArray, groupArray }) {
  const updateTotalDb = async (totalBill) => {
    const id = getCookie('billId');
    await axios.put(`/api/bills/${id}`, { totalBill });
  };

  const updatePeopleDb = async (peopleData) => {
    const data = Object.keys(peopleData);
    const id = getCookie('billId');
    await axios.put(`/api/bills/${id}`, { data });
  };

  const calTotalBill = () => {
    if (itemsArray.length > 0) {
      const totalBill = itemsArray.reduce((accumulator, item) => accumulator + item.price, 0);
      updateTotalDb(totalBill);
      return totalBill;
    }
    return 'Add items';
  };

  const splitBill = () => {
    const peopleId = {};

    for (let i = 0; i < itemsArray.length; i += 1) {
      const item = itemsArray[i];
      // split bill for each item
      const splitPricePerItem = item.price / item.sharing.length;
      // loop through inner array
      for (let j = 0; j < item.sharing.length; j += 1) {
        const key = item.sharing[j].toString();
        if (peopleId[key]) {
          peopleId[key] += splitPricePerItem;
        } else {
          peopleId[key] = splitPricePerItem;
        }
      }
    }
    updatePeopleDb(peopleId);
    return peopleId;
  };

  const displaySplitBill = () => {
    const display = Object.values(splitBill());
    return groupArray.map((item, index) => <p>{`${item.name}: $${display[index]}`}</p>);
  };

  return (
    <div className="container">
      <div className="row">
        <h1>
          TOTAL BILL: $
          {calTotalBill()}
        </h1>
      </div>

      <div className="row">
        <h1>SPLIT</h1>
        {displaySplitBill()}
      </div>
    </div>
  );
}
