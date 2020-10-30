import express from 'express';
import {
  uploadFiles,
  getFileList,
} from '../controllers/fileManager';

const router = express.Router();

router.get('/files', getFileList);
router.post('/files', uploadFiles);

export default router;
