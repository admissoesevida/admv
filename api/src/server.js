import bodyParser from 'body-parser';
import db from './models';
import express from 'express';
import handleExpenseTypes from './controllers/expense-types';
import handleIncomeTypes from './controllers/income-types';
import handleMembers from './controllers/member';
import handleProviders from './controllers/provider';

const PORT = 5000;
const env = process.env.NODE_ENV || 'development';
const app = express();

app.use(bodyParser.json());

handleMembers(app, db);
handleProviders(app, db);
handleIncomeTypes(app, db);
handleExpenseTypes(app, db);

app.get('/', (req, res) => {
  return res
    .status(200)
    .send({ environment: env, description: 'ADMV Rest API' });
});

if (!module.parent) {
  app.listen(PORT);
  console.log('Listening port ', PORT); // eslint-disable-line no-console
}

export default app;
