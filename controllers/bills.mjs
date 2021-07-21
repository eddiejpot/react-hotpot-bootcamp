/* ----------------------------------------- */
/* -------------------------- IMPORT MODULES */
/* ----------------------------------------- */
import pkg from 'sequelize';
import { resolve } from 'path';

const { Op } = pkg;

/*
 * ========================================================
 *                  Controller Functions
 * ========================================================
 */

export default function initBillsController(db) {
  // render the main page
  const index = async (request, response) => {
  };

  const create = async (request, response) => {
    const { billName } = request.body;
    try {
      const allBills = await db.Bill.create(
        { name: billName },
      );
      response.send(allBills);
    } catch (error) {
      console.error('!Error in creating bill', error);
    }
  };

  const edit = async (request, response) => {
    const { id } = request.params;
    let { totalBill } = request.body;
    if (typeof totalBill === 'string') {
      totalBill = 0;
    }
    try {
      const selectBill = await db.Bill.findByPk(id);
      await selectBill.update({ total: totalBill });
      console.log(`UPDATED TOTAL BILL: ${totalBill}`);
      response.end();
    } catch (error) {
      console.error('!Error in updating bill total');
    }
  };

  // return all functions we define in an object
  // refer to the routes file above to see this used
  return {
    index,
    create,
    edit,
  };
}
