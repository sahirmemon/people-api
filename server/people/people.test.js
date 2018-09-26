const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

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

  describe('# GET /api/people/:id', () => {
    it('should get person details', (done) => {
      request(app)
        .get(`/api/people/${person.id}`)
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
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });
});
