import { upload, getFiles } from '../../services/fileManager';

export const uploadFiles = async (req, res, next) => {
  const { files } = req.body;
  let success;

  try {
    await upload(files);
    success = true;
  } catch (err) {
    return next(err);
  }

  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong',
      success: false,
    });
  }

  return res.status(200).json({
    data: '',
    success: true,
  });
};

export const getFileList = async (req, res, next) => {
  let files = [];

  try {
    files = await getFiles();
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    files: files.map(f => f.toString()),
    success: true,
  });
};

export default {
  uploadFiles,
  getFileList,
};
