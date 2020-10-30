import appRoot from 'app-root-path';

const fs = require('fs');
const fsPromises = fs.promises;

const readFiles = async (dirname) => {
  const filenames = await fsPromises.readdir(dirname);
  return filenames;
}

export const upload = async (files) => {
  const promises = await files.map(async (file) => {
    const base64Data = file.base64String.replace(/^data:video\/mp4;base64,/, '');
    const result = await fsPromises.writeFile(`${appRoot}/assets/${file.name}`, base64Data, 'base64');
    return result;
  });

  const list = await Promise.all(promises);
  return list;
};

export const getFiles = async () => {
  const data = await readFiles(`${appRoot}/assets/`);
  return data;
};

export default {
  upload,
  getFiles,
};
