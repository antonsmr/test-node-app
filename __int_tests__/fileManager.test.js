const request = require('supertest');
const appRoot = require('app-root-path');
const fs = require('fs');

const app = require('../src/index');
const mockVideo = require('../mock/video');

const fsPromises = fs.promises;

const requester = request(app);

describe('files routes test', () => {
  it('It should return files', async () => {
    const base64Data = mockVideo.base64String.replace(/^data:video\/mp4;base64,/, '');
    await fsPromises.writeFile(`${appRoot}/assets/${mockVideo.name}`, base64Data, 'base64');

    const res = await requester
      .get('/files')
    await fs.unlinkSync(`${appRoot}/assets/${mockVideo.name}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      files: [
        'test-video.mp4',
      ],
      success: true
    });
  });

  it('It should create a video file', async () => {
    const data = { files: [mockVideo] };
    const res = await request(app)
      .post('/files')
      .send(data)
      .set('Accept', 'application/json')

      await fs.unlinkSync(`${appRoot}/assets/${mockVideo.name}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      data: '',
      success: true
    });
  })
});


afterAll(async () => {
  await app.close();
});