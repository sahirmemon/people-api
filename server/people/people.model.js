/**
 * Construct a Person model from the JSON object retrieved from People API
 */
function getTransformed(personObj) {
  const person = {
    id: personObj.id,
    name: personObj.display_name || `${personObj.first_name} ${personObj.last_name}`,
    emailAddress: personObj.personal_email_address || personObj.secondary_email_address || personObj.email_address || 'N/A',
    jobTitle: personObj.title || 'N/A',
  };
  return person;
}

module.exports = {
  getTransformed,
};
