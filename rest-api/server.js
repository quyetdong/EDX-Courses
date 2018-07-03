/** Import fundamental modules */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import errorhandler from 'errorhandler';

const app = express();

// Define memory data store
let store = {};
store.accounts = [];

/** Running basic middlewares */
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

// Read
app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts);
});

// Create
app.post('/accounts', (req, res) => {
    let newAccount = req.body;
    let id = store.accounts.length;
    store.accounts.push(newAccount);

    res.status(201).send({ id: id });
});

// Update
app.put('/accounts/:id', (req, res) => {
    let id = req.params.id;
    Object.assign(store.accounts[id], req.body);

    res.status(200).send(store.accounts[id]);
});

// Delete
app.delete('/accounts/:id', (req, res) => {
    let id = req.params.id;
    store.accounts.splice(id, 1);

    res.status(204).send();
});

app.listen(3003);
