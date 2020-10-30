import express from 'express';
import {
  getStream,
} from '../controllers/stream';

const router = express.Router();

router.get('/stream', getStream);

export default router;
