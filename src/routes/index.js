import express from 'express';
import fileManager from './fileManager';
import stream from './stream';

const router = express.Router();
router.use(fileManager);
router.use(stream);

export default router;
