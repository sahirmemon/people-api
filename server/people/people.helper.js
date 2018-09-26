// Get the frequency of each character in the email addresses of all the
// people.
// Returns a Map(key, value) where key is the character and value is the
// count.
function getFrequencyCount(people) {
  let counts = new Map();
  people.forEach((person) => {
    if (person.email_address) {
      counts = countCharacters(person.email_address, counts);
    }
    if (person.personal_email_address) {
      counts = countCharacters(person.personal_email_address, counts);
    }
    if (person.secondary_email_address) {
      counts = countCharacters(person.secondary_email_address, counts);
    }
  });
  const countsDescending = new Map(
    [...counts.entries()].sort((a, b) => b[1] - a[1]));
  return convertMapToDictionary(countsDescending);
}

// Returns the count of the characters in the string provided
function countCharacters(emailAddress, counts) {
  const characters = emailAddress.split('');
  characters.forEach((char) => {
    if (counts.has(char)) {
      counts.set(char, counts.get(char) + 1);
    } else {
      counts.set(char, 1);
    }
  });
  return counts;
}

// Convert a Map to a dictionary so it be returned as JSON
// http://2ality.com/2015/08/es6-map-json.html
function convertMapToDictionary(strMap) {
  const obj = Object.create(null);
  for (const [k, v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

module.exports = { getFrequencyCount };
