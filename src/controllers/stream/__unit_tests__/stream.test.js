require('babel-polyfill');

const appRoot = require('app-root-path');
const fs = require('fs');

const { getStat } = require('../../../services/stream');
const { upload } = require('../../../services/fileManager');

const mockVideo = require('../../../../mock/video');

describe('stream controller test', () => {
  it('It should return a video size', async () => {
    const files = [mockVideo];
    await upload(files);

    const statResult = await getStat(mockVideo.name);
    await fs.unlinkSync(`${appRoot}/assets/${mockVideo.name}`);
    
    expect(statResult).not.toBe(null);
    expect(statResult).toEqual({
      filePath: `${appRoot}/assets/test-video.mp4`,
      fileSize: 1570024
    });
  });
});
