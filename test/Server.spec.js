const PirateBay = require('thepiratebay');

jest.setTimeout(30000);

describe('API', () => {
  describe('Search', () => {
    let server;
    let request;

    beforeAll(() => {
      const port = process.env.PORT || 3000;
      server = require('../src/Server').listen(port);
      request = require('supertest')(server);
    });

    afterAll(() => {
      server.close();
    });

    it('should return same resonse as PirateBay', async (done) => {
      const result = await request.get('/search/game%20of%20thrones')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')

      const [apiResponse] = result.body;

      const res = await PirateBay.search('Game of Thrones');
      const [moduleResponse] = res;
      expect(apiResponse).toMatchSnapshot();
    });

    it('should accept categories', async (done) => {
      const result = await request.get('/search/game%20of%20thrones?category=audio')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

      const [apiResponse] = result.body

      const res = await PirateBay.search('Game of Thrones', {
        category: 'audio'
      });
      const [moduleResponse] = res;
      expect(apiResponse).toMatchSnapshot();
    });
  });
});
