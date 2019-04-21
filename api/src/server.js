import AuthController from './controllers/AuthController';
import AuthMiddleware from './middlewares/AuthMiddleware';
import ExpenseTypesController from './controllers/ExpenseTypesController';
import ExpensesController from './controllers/ExpensesController';
import IncomeController from './controllers/IncomeController';
import IncomeTypesController from './controllers/IncomeTypesController';
import MemberController from './controllers/MemberController';
import ProviderController from './controllers/ProviderController';

import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import session from 'cookie-session';

const PORT = 5000;
const env = process.env.NODE_ENV || 'development';
const app = express();
app.set('trust proxy', 1);

const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    name: 'admv-session',
    keys: ['admvK1', 'admvK2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'admv.com',
      path: '*',
      expires: expiryDate
    }
  })
);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', AuthController);
app.use('/api/expense-types', AuthMiddleware, ExpenseTypesController);
app.use('/api/expenses', AuthMiddleware, ExpensesController);
app.use('/api/income-types', AuthMiddleware, IncomeTypesController);
app.use('/api/incomes', AuthMiddleware, IncomeController);
app.use('/api/members', AuthMiddleware, MemberController);
app.use('/api/providers', AuthMiddleware, ProviderController);

app.get('/', AuthMiddleware, (req, res) => {
  return res
    .status(200)
    .send({ environment: env, description: 'ADMV Rest API' });
});

if (!module.parent) {
  app.listen(PORT);
  console.log('Listening port ', PORT); // eslint-disable-line no-console
}

export default app;
