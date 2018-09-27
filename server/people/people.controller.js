const httpStatus = require('http-status');
const Person = require('./people.model');
const request = require('./people.request');
const helper = require('./people.helper');

/**
 * Get all people
 * @property {number} req.query.page - Page number for the list of people to return
 * @property {number} req.query.perPage - Number of people to return per page
 * @returns {Person}[]
 */
function getAll(req, res) {
  const { page = 1, perPage = 100 } = req.query;
  request.getAll({ page, perPage })
    .then((people) => {
      if (people && people.data) {
        const transformedPeople = people.data.map(person => Person.getTransformed(person));
        return res.json(transformedPeople);
      }
      return res.status(httpStatus.NO_CONTENT).json({ message: 'No data' });
    })
    .catch(err => res.status(err.statusCode).json(err.error));
}

/**
 * Get a single person
 * @param {number} req.params.id - ID of the person to search
 * @returns {Person}
 */
function get(req, res) {
  const personId = req.params.id;
  request.getPerson(personId)
    .then((person) => {
      if (person && person.data) {
        const transformedPerson = Person.getTransformed(person.data);
        return res.json(transformedPerson);
      }
      return res.status(httpStatus.NO_CONTENT).json({ message: 'No data' });
    })
    .catch(err => res.status(err.statusCode).json(err.error));
}

/**
 * Get frequency count of all character in email addresses
 * @property {number} req.query.page - Page number for the list of people to return
 * @property {number} req.query.perPage - Number of people to return per page
 * @return {{Character:Count}}
 */
function getFrequencyCount(req, res) {
  const { page = 1, perPage = 100 } = req.query;
  request.getAll({ page, perPage })
    .then((people) => {
      if (people && people.data) {
        const frequencyData = helper.getFrequencyCount(people.data);
        return res.json(frequencyData);
      }
      return res.status(httpStatus.NO_CONTENT).json({ message: 'No data' });
    })
    .catch(err => res.status(err.statusCode).json(err.error));
}

/**
 * Get possible duplicates of people by observing their email addresses
 * @property {number} req.query.page - Page number for the list of people to return
 * @property {number} req.query.perPage - Number of people to return per page
 * @returns {[Person1, Person2]}[]
 */
function getDuplicates(req, res) {
  const { page = 1, perPage = 100 } = req.query;
  request.getAll({ page, perPage })
    .then((people) => {
      if (people && people.data) {
        const duplicates = helper.findDuplicates(people.data);
        return res.json(duplicates);
      }
      return res.status(httpStatus.NO_CONTENT).json({ message: 'No data' });
    })
    .catch(err => res.status(err.statusCode).json(err.error));
}

module.exports = { getAll, get, getFrequencyCount, getDuplicates };
