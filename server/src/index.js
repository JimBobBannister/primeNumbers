'use strict';
// Constants
const PORT = process.env.PORT || 8081;
const HOST = '0.0.0.0';

const logger = require('./logger');
const app = require('./app');

const server = app.listen(PORT, HOST);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Prime numbers application started on http://%s:%d', HOST,PORT)
);
