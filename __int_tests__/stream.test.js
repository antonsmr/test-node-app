const request = require('supertest');
const appRoot = require('app-root-path');
const fs = require('fs');

const app = require('../src/index');
const mockVideo = require('../mock/video');

const fsPromises = fs.promises;

const requester = request(app);

describe('stream routes test', () => {
  it('It should get the file stream', async () => {
    const base64Data = mockVideo.base64String.replace(/^data:video\/mp4;base64,/, '');
    await fsPromises.writeFile(`${appRoot}/assets/${mockVideo.name}`, base64Data, 'base64');

    const res = await requester
      .get('/stream')
      .query({ fileName: mockVideo.name })
      .set('Range', 'bytes=0-')
      .set('Content-Type', 'video/mp4')
      
      expect(res.statusCode).toEqual(206);
  });
});

afterAll(async () => {
  await app.close();
});