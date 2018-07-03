/** Import fundamental modules */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

/** Running basic middlewares */
app.use(bodyParser.json());
app.use(morgan('dev'));

let profile = [{
    username: 'azat',
    email: '[reducted]',
    url: 'http://azat.co'
}]

// Read
app.get('/profile', (req, res) => {
    if(req.query.id) {
        return res.json(profile[req.query.id]);
    }
    res.json(profile);
})

// Create
app.post('/profile', (req, res) => {
    profile.push(req.body);
    console.log('created', profile);
    res.sendStatus(201);
})

// Update
app.put('/profile/:id', (req, res) => {
    console.log(`profile is:`, profile, `req body is:`, req.body);

    // update partially, Object.assign copies property values.
    Object.assign(profile[req.params.id], req.body);
    console.log('updated', profile[req.params.id]);
    res.sendStatus(204);
})

// Delete
app.delete('/profile/:id', (req, res) => {
    profile.splice(req.params.id, 1);
    console.log('deleted', profile);
    res.sendStatus(204);
})

// Handle error
app.use((err, req, res, next) => {  
    console.log(`error handler: ${err}`);
    res.status(500).send(err);
})

app.listen(3002);
