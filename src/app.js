import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import sassMiddleware from 'node-sass-middleware';
import engine from 'ejs-locals';

import routes from './routes';

const app = express();
const PROD = (process.env.MODE === 'PROD');

const publicPath = path.join(__dirname, '../public');
const srcPath = path.join(__dirname, '../views/sass');
const destPath = path.join(__dirname, '../public/css');
const sourcemapsPath = path.join(__dirname, '../public/sourcemaps');

// app.disable('x-powered-by');

app.set('views', path.join(__dirname, '../views'));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout extractMetas', true);

app.set('layout', 'default_layout');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(sassMiddleware({
  src: srcPath,
  dest: destPath,
  sourceMap: sourcemapsPath,
  prefix: '/css',
  debug: !PROD,
  outputStyle: 'nested',
  sourceComments: 'normal',
  force: !PROD
}));

app.use(express.static(publicPath));

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('pages/error', {
      message: err.message
    });
});

export default app;
