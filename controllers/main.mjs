/* ----------------------------------------- */
/* -------------------------- IMPORT MODULES */
/* ----------------------------------------- */
import pkg from 'sequelize';
import { resolve } from 'path';

/*
 * ========================================================
 *                  Controller Functions
 * ========================================================
 */

export default function initMainController(db) {
  // render the main page
  const index = (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  };

  // return all functions we define in an object
  // refer to the routes file above to see this used
  return index;
}
