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

// Given a list of people, check to see if any of them are duplicate by observing
// their email address.
// Note that we are doing this using Levenshtein's algorithm and have set the
// threshold (number of edit requires) to 2 in order to count as a possible duplicate.
// Which means that if we 0 then we have a duplicate. If we get 1 then it means it is a
// possible duplicate since only one edit is required.
function findDuplicates(people) {
  const duplicates = [];
  for (let i = 0; i < people.length; i += 1) {
    for (let j = i + 1; j < people.length; j += 1) {
      if (getLevenshteinDistance(people[i], people[j]) <= 2) {
        duplicates.push([people[i], people[j]]);
      }
    }
  }
  return duplicates;
}

// Using Levenshtein Distance algorith get the total number of edits required to turn
// person2's email address into person1's email address
// https://coderwall.com/p/uop8jw/fast-and-working-levenshtein-algorithm-in-javascript
function getLevenshteinDistance(person1, person2) {
  const emailAddress1 = person1.email_address;
  const emailAddress2 = person2.email_address;

  if (emailAddress1.length === 0) {
    return emailAddress2.length;
  }

  if (emailAddress2.length === 0) {
    return emailAddress1.length;
  }

  const matrix = [];

  // Fill the first column of each row
  for (let i = 0; i <= emailAddress2.length; i += 1) {
    matrix[i] = [i];
  }

  // Fill each column in the first row
  for (let j = 0; j <= emailAddress1.length; j += 1) {
    matrix[0][j] = [j];
  }

  // Fill the rest of the matrix
  for (let i = 1; i <= emailAddress2.length; i += 1) {
    for (let j = 1; j <= emailAddress1.length; j += 1) {
      // if the characters are the same then simply take the diagonal value
      if (emailAddress2.charAt(i - 1) === emailAddress1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        // Look left, top, and top-left diagonally; get the min and
        // plus 1 that number to calculate the edits required
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1));
      }
    }
  }

  // Return the total number of edit requires to convert emailAddress1 into emailAddress2
  return matrix[emailAddress2.length][emailAddress1.length];
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

module.exports = { getFrequencyCount, findDuplicates, };
