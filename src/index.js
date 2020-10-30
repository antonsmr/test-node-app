import 'babel-polyfill';
import cors from 'cors';
import bodyParser from 'body-parser';
const fs = require('fs');

import router from './routes';

const express = require('express');
const app = express();
const port = 8000;

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Video hosting server listening at http://localhost:${port}`)
})