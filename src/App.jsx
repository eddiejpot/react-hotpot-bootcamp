import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBill from './components/CreateBill.jsx';
import EditGroup from './components/EditGroup.jsx';
import EditItems from './components/EditItems.jsx';
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
    const editGroup = document.querySelector('.EditGroup');
    const editItems = document.querySelector('.EditItems');
    const computeBill = document.querySelector('.ComputeBill');

    switch (componentName) {
      case 'editGroup':
        editGroup.classList.remove('hide-component');
        editItems.classList.add('hide-component');
        computeBill.classList.add('hide-component');
        break;
      case 'editItems':
        editGroup.classList.add('hide-component');
        editItems.classList.remove('hide-component');
        computeBill.classList.add('hide-component');
        break;
      case 'computeBill':
        editGroup.classList.add('hide-component');
        editItems.classList.add('hide-component');
        computeBill.classList.remove('hide-component');
        break;

      default:
        break;
    }
  };

  const MenuButtons = () => (
    <div className="container">
      <div className="row">
        <div className="col Group">
          <button type="button" onClick={() => showHideComponents('editGroup')}>Group Details</button>
        </div>
        <div className="col Items">
          <button type="button" onClick={() => showHideComponents('editItems')}>Items</button>
        </div>
        <div className="col Bill">
          <button type="button" onClick={() => showHideComponents('computeBill')}>Calculate Bill</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      {showCreateBillComponent && <CreateBill createBill={createBill} />}
      {showCreateBillComponent || MenuButtons()}
      <div className="EditGroup hide-component">
        <EditGroup groupArray={groupArray} setGroupArray={setGroupArray} />
      </div>
      <div className="EditItems hide-component">
        <EditItems groupArray={groupArray} setItemsArray={setItemsArray} />
      </div>
      <div className="ComputeBill hide-component">
        <ComputeBill itemsArray={itemsArray} groupArray={groupArray} />
      </div>
    </div>
  );
}
