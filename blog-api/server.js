/** Import Modules */
import express from 'express';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import logger from 'morgan';
import { Router as routes } from './routes';

/** Declare app and set PORT */
const app = express();
const PORT = process.env.PORT || 3003;

/** Run app */
// Run middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

// Run app
app.use('/', routes);

// Listen request
app.listen(PORT);
