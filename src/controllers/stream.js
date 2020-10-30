import appRoot from 'app-root-path';

const fs = require('fs');

export const getStream = async (req, res, next) => {
  const { fileName } = req.query;
  const { range } = req.headers;

  const filePath = `${appRoot}/assets/${fileName}`;
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1;

    if (start >= fileSize) {
      res.status(416).send(`Requested range not satisfiable\n ${start} >= ${fileSize}`);
      return;
    }
    
    const chunksize = (end-start) + 1;
    const file = fs.createReadStream(filePath, {start, end});
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
};

export default {
  getStream,
};
