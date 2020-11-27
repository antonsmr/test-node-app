require('babel-polyfill');

const appRoot = require('app-root-path');
const fs = require('fs');

const { upload, getFiles } = require('../../../services/fileManager');

const mockVideo = require('../../../../mock/video');

describe('file manager controller test', () => {
  it('It should upload the mock video', async () => {
    const files = [mockVideo];
    const uploadResult = await upload(files);
    await fs.unlinkSync(`${appRoot}/assets/${mockVideo.name}`);

    expect(uploadResult).not.toBe(null);
  });

  it('It should return the mock video', async () => {
    const files = [mockVideo];
    await upload(files);

    const videoListResult = await getFiles();

    expect(videoListResult).not.toBe(null);
    expect(videoListResult).toEqual(['test-video.mp4']);
  });
});
