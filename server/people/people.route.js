const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const paramValidation = require('./people.validation');
const peopleCtrl = require('./people.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/people - Get list of people */
  .get(expressJwt({ secret: config.apiSecret }), peopleCtrl.getAll);

router.route('/frequency-count')
  /** GET /api/people/frequency-count - Get frequency count of all
   * characters in all email addresses */
  .get(expressJwt({ secret: config.apiSecret }), peopleCtrl.getFrequencyCount);

router.route('/duplicates')
/** GET /api/people/duplicates - Get possible duplicates */
.get(expressJwt({ secret: config.apiSecret }), peopleCtrl.getDuplicates);

router.route('/:id')
  /** GET /api/people/:id - Get person */
  .get(expressJwt({ secret: config.apiSecret }),
    validate(paramValidation.getPerson), peopleCtrl.get);


module.exports = router;
