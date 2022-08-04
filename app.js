const express = require('express');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

const app = express();

mongoose
  .connect(
    'mongodb+srv://matthieu:atlKenshin@cluster0.zpmdqhm.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// autorise req.body below
app.use(express.json());
// app.use(bodyParser.json());

// set header to authorize comm
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// post request
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    // title: req.body.title,
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: 'Object save !' }))
    .catch(error => res.status(400).json({ error }));
});

// put
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Object modify!' }))
    .catch(error => res.status(400).json({ error }));
});

// get one obj
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

// get request
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;
