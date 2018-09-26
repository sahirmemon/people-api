const Joi = require('joi');

module.exports = {
  // GET /api/people/:id
  getPerson: {
    params: {
      id: Joi.string().required()
    }
  },
};
