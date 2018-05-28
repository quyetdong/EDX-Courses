import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use((req, res, next) => {  // middleware
//   console.log(`${req.method}: ${req.url}`);
//   next();
// })

const middleware2 = (req, res, next) => { // middleware
  console.log(req.query);
  if (req.query.api_key) {
    next();
  } else {
    res.status(401).send({ Message: 'Not authorized' });
  }
}

app.use(middleware2);

app.get('/', (req, res) => { // request handler
  res.send({ Message: 'Go to the world!' })
})

app.get('/accounts', (req, res, next) => { // inline middleware
  console.log('accounts inline middleware!');
  next(new Error('new Error inside accounts'));
}, (req, res) => {                      // request handler
  res.send({ Message: 'accounts' })
})

app.post('/transactions', (req, res) => { // request handler
  console.log(req.body);
  res.send({ Message: 'transactions' })
})

app.use((err, req, res, next) => {  // error handler
  console.log(`error handler: ${err}`);
  res.status(500).send(err);
})

app.listen(3001);
