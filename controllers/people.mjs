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

export default function initPeopleController(db) {
  const create = async (request, response) => {
    const { name, billId } = request.body;
    try {
      const newMember = await db.Person.create(
        {
          name,
          billId,
        },
      );
      response.send(newMember);
    } catch (error) {
      console.error('!Error in creating new member', error);
    }
  };

  const edit = async (request, response) => {
    const { id } = request.params;
    const { totalBill } = request.body;
    console.log(request.body);
  };

  // return all functions we define in an object
  // refer to the routes file above to see this used
  return {
    create,
    edit,
  };
}
