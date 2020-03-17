/**
 * 默认配置
 */

const path = require('path');

const env = process.env;

// default env config
module.exports = {
  // application
  nodeEnv: env.NODE_ENV || 'dev',
  managerId: env.MANAGER_ID || 'xxx',
  // wechaty
  botName: env.BOT_NAME || 'assistant',
  botAlias: env.BOT_ALIAS || '小助手',
  wechatyToken: env.WECHATY_TOKEN || 'xxx',
  // log
  logName: env.LOG_NAME || 'app.log',
  logLevel: env.LOG_LEVEL || 'debug',
  logPath: env.LOG_PATH || path.join(__dirname, '../logs'),
  // db
  dbName: env.DB_NAME || 'assistant.db',
  dbPath: env.DB_PATH || path.join(__dirname, '../'),
  // request
  requestResponseTimeout: env.REQ_RESP_TIMEOUT || 3000,
  requestConnectTimeout: env.REQ_CONNECT_TIMEOUT || 3000,
  // custom system
  customSystemUrl: env.CUSTOM_SYSTEM_URL || 'http://example.com',
  // split word
  splitWordUrl: env.SPLIT_WORD_URL || 'http://114.67.84.223',
  splitWordDOC: env.splitWordDOC || 1, // 相关度
};
