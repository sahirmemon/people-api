const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./people.validation');
const peopleCtrl = require('./people.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/people - Get list of people */
  .get(peopleCtrl.getAll);

router.route('/frequency-count')
  /** GET /api/people/frequency-count - Get frequency count of all
   * characters in all email addresses */
  .get(peopleCtrl.getFrequencyCount);

router.route('/duplicates')
/** GET /api/people/duplicates - Get possible duplicates */
.get(peopleCtrl.getDuplicates);

router.route('/:id')
  /** GET /api/people/:id - Get person */
  .get(validate(paramValidation.getPerson), peopleCtrl.get);


module.exports = router;
