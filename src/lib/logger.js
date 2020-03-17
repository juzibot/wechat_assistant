/**
 * Create by geekeryoung on 2020/3/15
 *
 * 日志组件
 */

const fs = require('fs');
const path = require('path');
const pino = require('pino');

const dateUtil = require('../util/dateUtil');
const config = require('../../config/default.config');

// 如果 日志路径不存在 则创建
if (!fs.existsSync(config.logPath)) {
  fs.mkdirSync(config.logPath);
}

// 如果是开发环境 则日志打印至控制台 而不是文件
let dest = pino.extreme();
if (config.nodeEnv != 'dev') {
  dest = pino.extreme(path.join(config.logPath, config.logName));
}

// 初始化日志记录器
const logger = pino({
  enabled: true,
  useLevelLabels: true,
  level: config.logLevel
}, dest);

// 开启极限模式 以下操作 最大限度防止日志丢失
// asynchronously flush every 5 seconds to keep the buffer empty
// in periods of low activity
setInterval(() => {
  logger.flush()
}, 5000).unref();

// use pino.final to create a special logger that
// guarantees final tick writes
const handler = pino.final(logger, (err, finalLogger, evt) => {
  finalLogger.info(`${evt} caught`);
  if (err) finalLogger.error(err, 'error caused exit');
  // 收到关闭信号 3s 后关闭 (给其他任务留持久化时间)
  setTimeout(process.exit, 3000, err ? 1 : 0);
});

// catch all the ways node might exit
process.on('beforeExit', () => handler(null, 'beforeExit'));
process.on('exit', () => handler(null, 'exit'));
process.on('uncaughtException', (err) => handler(err, 'uncaughtException'));
process.on('SIGINT', () => handler(null, 'SIGINT'));
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
process.on('SIGTERM', () => handler(null, 'SIGTERM'));

// end

module.exports = {
  logger: logger,

  /**
   * 适应老调用方式
   * @param level
   * @param message
   */
  log(level, ...message) {
    let dateTime = dateUtil.dateToString();
    switch (level) {
      case 'info':
        logger.info({dateTime, message});
        break;
      case 'debug':
        logger.debug({dateTime, message});
        break;
      case 'warn':
        logger.warn({dateTime, message});
        break;
      case 'error':
        logger.error({dateTime, message});
        break;
      default:
        logger.info({dateTime, message});
        break;
    }
  },
};
