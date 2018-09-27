const request = require('request-promise');
const config = require('../../config/config');

// Get headers for HTTP requests
function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.apiKey}`,
  };
}

// Get all people from People API
function getAll(queryParams) {
  const options = {
    uri: `${config.apiUrl}/v2/people.json?page=${queryParams.page}&per_page=${queryParams.perPage}`,
    headers: getHeaders(),
    json: true,
  };
  return request(options);
}

// Get a specific person based on their ID
function getPerson(id) {
  const options = {
    uri: `${config.apiUrl}/v2/people/${id}.json`,
    headers: getHeaders(),
    json: true,
  };
  return request(options);
}

module.exports = {
  getAll,
  getPerson,
};
