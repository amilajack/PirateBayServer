import { expect } from 'chai';
import server from '../lib/Server';


const request = require('supertest')(server);

const url = 'http://dl.opensubtitles.org/en/download/src-api/vrf-19f00c62/sid-9762j5nq6vsvu4tf83bnhenqu5/filead/1951988772';

describe('API', () => {
  describe('Subtitles', () => {
    it('test subtitle', (done) => {
      try {
        request.get(`/subtitles/${encodeURIComponent(url)}`)
          .expect(200)
          .end((error, response) => {
            expect(response.text).to.contain('VTT');
            done();
          });
      } catch (err) {
        done(err);
      }
    });
  });
});
