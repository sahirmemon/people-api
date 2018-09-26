const express = require('express');
const peopleRoutes = require('./server/people/people.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/people', peopleRoutes);

module.exports = router;
