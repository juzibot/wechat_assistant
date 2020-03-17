/**
 * Create by geekeryoung on 2020/3/14
 *
 * 消息相关的服务
 */

const logger = require('../lib/logger');
const splitWord = require('../lib/splitWord');
const actionDao = require('../dao/actionDao');
const keywordDao = require('../dao/keywordDao');
const config = require('../../config/default.config');

module.exports = {
  /**
   * 用于发送消息 并记录日志
   * @param from {Contact|Room}
   * @param text
   * @return {Promise<void>}
   */
  async sendMessage(from, text) {
    await from.say(text);
    logger.log('info', `send to:${from.name ? from.name() : await from.topic()} message:${text}`);
  },

  /**
   * 使用 message 对象发送消息
   * @param message {Message}
   * @param text
   * @return {Promise<void>}
   */
  async sendMessageByMsg(message, text) {
    await this.sendMessage(message.room() || message.from(), text);
  },

  /**
   * 查询消息 action
   * @param msgData
   * @return {Promise<Object>} {...action_tb}
   */
  async queryActionByKeyword(msgData) {
    let keywords = await splitWord.splitWord({url: config.splitWordUrl, doc: config.splitWordDOC, str: msgData.action});
    return actionDao.queryActionByKeyword(keywords);
  },

  /**
   * 将msgData 里的字段进行统一
   * @param msgData
   * @return {Promise<Object>}
   */
  async unificationMsgData(msgData) {
    let data = {};
    for (let key of Object.keys(msgData)) {
      let keyword = keywordDao.queryKeywordByValue(key.toLowerCase());
      data[keyword.name] = msgData[key];
    }
    return data;
  }
};
