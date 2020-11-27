import appRoot from 'app-root-path';

const fs = require('fs');
const fsPromises = fs.promises;

export const getStat = async (fileName) => {
  const filePath = `${appRoot}/assets/${fileName}`;
  const stat = await fsPromises.stat(filePath);
  const fileSize = stat.size;

  const data = {
    filePath,
    fileSize,
  };
  return data;
};

export default {
  getStat,
};
