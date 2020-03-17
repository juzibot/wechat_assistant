/**
 * Create by geekeryoung on 2020/3/16
 */

const path = require('path');

// 这里为PM2的参数和环境变量
module.exports = {
  apps: [{
    name: 'assistant',
    // 自动部署 需要使用全局路径
    script: path.join(__dirname, '../src/index.js'),
    merge_logs: true,
    disable_logs: true,
    max_memory_restart: '1G',
    exec_mode: 'fork',
    instances: '1',
    env: {
      NODE_ENV: 'prod',
      MANAGER_ID: 'xxx',
      BOT_NAME: 'assistant',
      BOT_ALIAS: '小助手',
      WECHATY_TOKEN: 'xxx',
      LOG_NAME: 'app.log',
      LOG_LEVEL: 'info',
      LOG_PATH: path.join(__dirname, '../logs'),
      DB_NAME: 'assistant.db',
      DB_PATH: path.join(__dirname, '../'),
      REQ_RESP_TIMEOUT: 3000,
      REQ_CONNECT_TIMEOUT: 3000,
      CUSTOM_SYSTEM_URL: 'example.com',
      SPLIT_WORD_URL: 'http://114.67.84.223',
      splitWordDOC: 1, // 相关度
    }
  }]
};
