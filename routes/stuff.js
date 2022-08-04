const express = require('express')
const router = express.Router();

const Thing = require('../models/Thing');

// post
router.post('/', (req, res, next) => {
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
router.put(':id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Object modify!' }))
    .catch(error => res.status(400).json({ error }));
});

// delete
router.delete(':id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Object deleted' }))
    .catch(error => res.status(400).json({ error }));
});

// get one obj
router.get(':id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

// get request
router.get('/', (req, res, next) => {
  Thing.find()
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;