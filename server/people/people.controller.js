const httpStatus = require('http-status');
const Person = require('./people.model');
const request = require('./people.request');
const helper = require('./people.helper');

/**
 * Get all people
 * @returns {Person}
 */
function getAll(req, res) {
  request.getAll()
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
 * @param id
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
 */
function getFrequencyCount(req, res) {
  request.getAll()
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
 */
function getDuplicates(req, res) {
  request.getAll()
    .then((people) => {
      if (people && people.data) {
        const duplicates = helper.findDuplicates(people.data);
        console.log(duplicates);
        return res.json(duplicates);
      }
      return res.status(httpStatus.NO_CONTENT).json({ message: 'No data' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.statusCode).json(err.error);
    });
}

module.exports = { getAll, get, getFrequencyCount, getDuplicates };
