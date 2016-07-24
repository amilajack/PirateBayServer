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

            console.log(result.body[0]);

            const some = result.body[0]

            PirateBay
              .search('Game of Thrones')
              .then(res => {
                console.log(res[0]);
                const another = res[0];

                expect(some).to.eql(another);
                done();
              });
          });
      } catch (err) {
        done(err);
      }
    });

    it('should accept categories', (done) => {
      try {
        request.get('/search/game%20of%20thrones&category=200')
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end(function (error, result) {

            console.log(result);

            const some = result

            PirateBay
              .search('Game of Thrones', {
                category: 'audio'
              })
              .then(res => {
                console.log(res[0]);
                const another = res[0];

                expect(some).to.eql(another);
                done();
              });
          });
      } catch (err) {
        done(err);
      }
    });
  });
});
