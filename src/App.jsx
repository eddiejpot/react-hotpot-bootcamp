import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBill from './components/CreateBill.jsx';
import Group from './components/Group.jsx';
import Items from './components/Items.jsx';
import ComputeBill from './components/ComputeBill.jsx';
import { createCookie } from '../utils/cookie.mjs';

export default function App() {
  // State: show/hide components
  const [showCreateBillComponent, setShowCreateBillComponent] = useState(true);
  // State: Data
  const [groupArray, setGroupArray] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);

  const createBill = async (billName) => {
    //  axios request to create new bill in bills table
    const { data: newBillData } = await axios.post('/api/bills', { billName });
    console.log('NEW BILL CREATED!');

    // send cookie to browser to set bill id
    createCookie('billId', newBillData.id);

    // hide CreateBill Component once bill is created
    setShowCreateBillComponent(false);
  };

  const showHideComponents = (componentName) => {
    // select parents of components
    const groupElement = document.querySelector('.Group');
    const itemsElement = document.querySelector('.Items');
    const computeBillElement = document.querySelector('.ComputeBill');

    switch (componentName) {
      case 'Group':
        groupElement.classList.remove('hide-component');
        itemsElement.classList.add('hide-component');
        computeBillElement.classList.add('hide-component');
        break;
      case 'Items':
        groupElement.classList.add('hide-component');
        itemsElement.classList.remove('hide-component');
        computeBillElement.classList.add('hide-component');
        break;
      case 'computeBill':
        groupElement.classList.add('hide-component');
        itemsElement.classList.add('hide-component');
        computeBillElement.classList.remove('hide-component');
        break;

      default:
        break;
    }
  };

  const MenuButtons = () => (
    <div className="container">
      <div className="row">
        <div className="col group-button">
          <button type="button" onClick={() => showHideComponents('Group')}>Group Details</button>
        </div>
        <div className="col items-button">
          <button type="button" onClick={() => showHideComponents('Items')}>Items</button>
        </div>
        <div className="col bill-button">
          <button type="button" onClick={() => showHideComponents('computeBill')}>Calculate Bill</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      {showCreateBillComponent && <CreateBill createBill={createBill} />}
      {showCreateBillComponent || MenuButtons()}
      <div className="Group hide-component">
        <Group groupArray={groupArray} setGroupArray={setGroupArray} />
      </div>
      <div className="Items hide-component">
        <Items groupArray={groupArray} setItemsArray={setItemsArray} />
      </div>
      <div className="ComputeBill hide-component">
        <ComputeBill itemsArray={itemsArray} groupArray={groupArray} />
      </div>
    </div>
  );
}
