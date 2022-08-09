const Thing = require('../models/Thing');

// create thing
exports.createThing = (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: 'Object save !' }))
    .catch(error => res.status(400).json({ error }));
};

// modify  thing
exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Object modify!' }))
    .catch(error => res.status(400).json({ error }));
};

// delete thing
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Object deleted' }))
    .catch(error => res.status(400).json({ error }));
};

// get one thing
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

// get things
exports.getThings = (req, res, next) => {
  Thing.find()
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
};
