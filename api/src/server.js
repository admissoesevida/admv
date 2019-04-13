import bodyParser from 'body-parser';
import express from 'express';
import handleExpenseTypes from './controllers/expense-types';
import handleExpenses from './controllers/expense';
import handleIncomeTypes from './controllers/income-types';
import handleIncomes from './controllers/income';
import handleMembers from './controllers/member';
import handleProviders from './controllers/provider';

const PORT = 5000;
const env = process.env.NODE_ENV || 'development';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/expense-types', handleExpenseTypes);
app.use('/expenses', handleExpenses);
app.use('/income-types', handleIncomeTypes);
app.use('/incomes', handleIncomes);
app.use('/members', handleMembers);
app.use('/providers', handleProviders);

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
