/**
 * Routing of backend api, to database.
 * Routes defined using Express router.
 * Provides GET. POST, PUT and DELETE methods.
 */


var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var System = require('../models/System.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  System.find(function (err, systems) {
    if (err) return next(err);
    res.json(systems);
  });
});

/* POST /system */
router.post('/', function(req, res, next) {
  System.create(req.body, function (err, system) {
    if (err) return next(err);
    res.json(system);
  });
});

/* GET /systems/id */
router.get('/:id', function(req, res, next) {
  System.findById(req.params.id, function (err, system) {
    if (err) return next(err);
    res.json(system);
  });
});

/* PUT /systems/:id */
router.put('/:id', function(req, res, next) {
  System.findByIdAndUpdate(req.params.id, req.body, function (err, system) {
    if (err) return next(err);
    res.json(system);
  });
});

/* DELETE /systems/:id */
router.delete('/:id', function(req, res, next) {
  System.findByIdAndRemove(req.params.id, req.body, function (err, system) {
    if (err) return next(err);
    res.json(system);
  });
});

module.exports = router;
