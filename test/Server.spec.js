const mocha = require('mocha');
const PirateBay = require('thepiratebay');
const server = require('../src/Server');
const request = require('supertest')(server);
const expect = require('chai').expect;



describe('API', () => {
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
});
