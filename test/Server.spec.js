const PirateBay = require('thepiratebay');

jest.setTimeout(20000);

describe('API', () => {
  describe('Search', () => {
    let server;
    let request;

    beforeAll(() => {
      const port = process.env.PORT || 3000;
      server = require('../').listen(port);
      request = require('supertest')(server);
    });

    afterAll(() => {
      server.close();
    });

    it('should return same resonse as PirateBay', async () => {
      const result = await request.get('/search/game%20of%20thrones')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')

      const [apiResponse] = result.body;

      const res = await PirateBay.search('Game of Thrones');
      const [moduleResponse] = res;
      delete apiResponse.seeders;
      delete apiResponse.leechers;
      expect(apiResponse).toMatchSnapshot();
    });

    it('should accept categories', async () => {
      const result = await request.get('/search/game%20of%20thrones?category=audio')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

      const [apiResponse] = result.body

      const res = await PirateBay.search('Game of Thrones', {
        category: 'audio'
      });
      const [moduleResponse] = res;
      delete apiResponse.seeders;
      delete apiResponse.leechers;
      expect(apiResponse).toMatchSnapshot();
    });
  });
});
