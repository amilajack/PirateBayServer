/* eslint global-require: off, no-param-reassign: off */
const PirateBay = require('thepiratebay');

jest.setTimeout(20000);

function removeVolatileProperties(obj) {
  delete obj.seeders;
  delete obj.leechers;
  return obj;
}

describe('API', () => {
  describe('Search', () => {
    let server;
    let request;

    beforeAll(() => {
      server = require('../');
      request = require('supertest')(server);
    });

    afterAll(() => {
      server.close();
    });

    it('should return same resonse as PirateBay', async () => {
      const result = await request.get('/search/game%20of%20thrones')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

      const [apiResponse] = result.body;

      const res = await PirateBay.search('Game of Thrones');
      const [moduleResponse] = res;
      expect(removeVolatileProperties(apiResponse)).toMatchSnapshot();
      expect(removeVolatileProperties(moduleResponse)).toMatchSnapshot();
    });

    it('should accept categories', async () => {
      const result = await request.get('/search/game%20of%20thrones?category=audio')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

      const [apiResponse] = result.body;

      const res = await PirateBay.search('Game of Thrones', {
        category: 'audio'
      });
      const [moduleResponse] = res;
      expect(removeVolatileProperties(apiResponse)).toMatchSnapshot();
      expect(removeVolatileProperties(moduleResponse)).toMatchSnapshot();
    });
  });
});
