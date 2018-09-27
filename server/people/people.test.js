const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');
const helper = require('./people.helper');
const config = require('../../config/config');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  done();
});

describe('## People APIs', () => {
  const person = {
    id: 101694867,
    name: 'Marisa Casper',
    emailAddress: 'isnaoj_nathz@ihooberbrunner.net',
    jobTitle: 'Direct Security Representative'
  };

  const token = `Bearer ${config.testingApiKey}`;

  describe('# GET /api/people/:id', () => {
    it('should get person details', (done) => {
      request(app)
        .get(`/api/people/${person.id}`)
        .set('Authorization', token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(person.name);
          expect(res.body.emailAddress).to.equal(person.emailAddress);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/people/12312414')
        .set('Authorization', token)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.error).to.equal('Not found');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/people/', () => {
    it('should get all people', (done) => {
      request(app)
        .get('/api/people')
        .set('Authorization', token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should fail to get people because of wrong token', (done) => {
      request(app)
        .get('/api/people')
        .set('Authorization', 'Bearer inValidToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => {
          done();
        })
        .catch(done);
    });

    it('should get people', (done) => {
      request(app)
        .get('/api/people')
        .set('Authorization', token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('Test Frequency Count', () => {
    it('Count should be equal', (done) => {
      const test = [{ email_address: 'a@a.a' }];
      const shouldReturn = {
        a: 3,
        '@': 1,
        '.': 1
      };
      const result = helper.getFrequencyCount(test);
      expect(result).to.deep.equal(shouldReturn);
      done();
    });
  });

  describe('Test Duplicates', () => {
    it('People should be duplicate', (done) => {
      const test = [{ email_address: 'sahir@memon.com' }, { email_address: 'sahir@memon.com' }];
      const shouldReturn = [
        [
          {
            email_address: 'sahir@memon.com'
          },
          {
            email_address: 'sahir@memon.com'
          }
        ]
      ];
      const result = helper.findDuplicates(test);
      expect(result).to.deep.equal(shouldReturn);
      done();
    });

    it('People should be possible duplicates', (done) => {
      const test = [{ email_address: 'sahir@memon.com' }, { email_address: 'sahir@memo.com' }];
      const shouldReturn = [
        [
          {
            email_address: 'sahir@memon.com'
          },
          {
            email_address: 'sahir@memo.com'
          }
        ]
      ];
      const result = helper.findDuplicates(test);
      expect(result).to.deep.equal(shouldReturn);
      done();
    });

    it('People should not be duplicates', (done) => {
      const test = [{ email_address: 'sahir@memon.com' }, { email_address: 'john@williams.com' }];
      const shouldReturn = [];
      const result = helper.findDuplicates(test);
      expect(result).to.deep.equal(shouldReturn);
      done();
    });
  });
});
