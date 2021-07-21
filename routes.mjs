// import { resolve } from 'path';
import db from './models/index.mjs';
import initMainController from './controllers/main.mjs';
import initBillsController from './controllers/bills.mjs';
import initPeopleController from './controllers/people.mjs';

export default function routes(app) {
  const mainController = initMainController(db);
  const billsController = initBillsController(db);
  const peopleController = initPeopleController(db);

  // special JS page. Include the webpack index.html file
  app.get('/home', mainController);

  // API
  // create new bill
  app.post('/api/bills', billsController.create);
  // update bill
  app.put('/api/bills/:id', billsController.edit);

  // create new person
  app.post('/api/people', peopleController.create);
  app.post('/api/people/:id', peopleController.edit);
}
