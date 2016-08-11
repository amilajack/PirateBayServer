const mocha = require('mocha');
const PirateBay = require('thepiratebay');
const server = require('../src/Server');
const request = require('supertest')(server);
const expect = require('chai').expect;



describe('API', () => {
  describe('Search', () => {
    it('should return same resonse as PirateBay', (done) => {
      try {
        request.get('/search/game%20of%20thrones')
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end(function (error, result) {
            const [apiResponse] = result.body;

            PirateBay
              .search('Game of Thrones')
              .then(res => {
                const [moduleResponse] = res;
                expect(apiResponse).to.eql(moduleResponse);
                done();
              })
              .catch(err => done(err));
          });
      } catch (err) {
        done(err);
      }
    });

    it('should accept categories', (done) => {
      try {
        request.get('/search/game%20of%20thrones?category=audio')
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end(function (error, result) {
            const [apiResponse] = result.body

            PirateBay
              .search('Game of Thrones', {
                category: 'audio'
              })
              .then(res => {
                const [moduleResponse] = res;
                expect(apiResponse).to.eql(moduleResponse);
                done();
              })
              .catch(err => done(err));
          });
      } catch (err) {
        done(err);
      }
    });
  });
});
