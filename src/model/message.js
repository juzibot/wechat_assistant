/**
 * Create by geekeryoung on 2020/3/14
 *
 * 用于接收到消息后的处理
 */

const logger = require('../lib/logger');
const messageUtil = require('../util/messageUtil');
const powerService = require('../service/powerService');
const messageService = require('../service/messageService');
const requestService = require('../service/requestService');

module.exports = {
  /**
   * 用于接收消息 并分发
   * @param bot
   * @param message
   * @return {Promise<void>}
   */
  async index(bot, message) {
    // 当有人在群中@我时再处理或者私聊时 再处理
    if ((message.room() && (await message.mentionSelf())) || !message.room()) {
      try {
        // 打印原始数据
        logger.log('info', `from:${message.from().name()}/room:${message.room() ? await message.room().topic() : null}/text:${message.text()}`);
        // 将消息内容格式化
        let msgData = messageUtil.formatMessage(message.text());
        // 查询 消息 action
        let action = await messageService.queryActionByKeyword(msgData);
        // 格式化消息里的字段
        msgData = await messageService.unificationMsgData(msgData);
        // 如果查到 action 则继续 否则提示错误
        if (action) {
          // 校验权限
          if (await powerService.verifyActionPower(message.from().id, action.id)) {
            // 执行操作
            switch (action.operation) {
              case 'queryRequest':
                await this.queryStatus(bot, message, msgData);
                break;
            }
          } else {
            await messageService.sendMessageByMsg(message, '抱歉，你暂时没有这个权限');
          }
        } else {
          await messageService.sendMessageByMsg(message, '你可以这样问我：\n查询状态');
        }
      } catch (e) {
        await messageService.sendMessageByMsg(message, '抱歉短路了，重试一下吧！');
      }
    }
  },

  /**
   * 查询状态
   * @param bot
   * @param message
   * @param msgData = {phone,?email}
   * @return {Promise<void>}
   */
  async queryStatus(bot, message, msgData) {
    const {phone, email} = msgData;
    try {
      let returnMsg = '请参照如下格式提问：\n查询状态\n手机号:13000000000\n邮箱(可选):example@xxx.com';
      // 如果 phone 不存在 则发送提示语
      if (phone) {
        // 如果存在 email 则查询详细信息 否则查询统计信息
        if (email) {
          let result = await requestService.queryStatusDetail(phone, email);
          // 这整理错误和成功的发送消息
          if (!result.error) {
            returnMsg = `手机号为:${phone}，邮箱为:${email}的状态如下：\n` +
              `状态:${messageUtil.customMsgStateToZh(result.state)}\n` +
              `时间:${result.time}\n`;
          } else {
            returnMsg = '未查询到该状态，可能是手机号或邮箱错误';
          }
        } else {
          let result = await requestService.queryStatus(phone);
          // 这整理错误和成功的发送消息
          if (!result.error) {
            returnMsg = `手机号:${phone}的状态如下：\n时间:${result.time}\n` +
              `总数:${result.total}\n成功数:${result.success}\n失败数:${result.fail}\n`;
          } else {
            returnMsg = '未查询到该状态，可能是手机号错误';
          }
        }
      }
      await messageService.sendMessageByMsg(message, returnMsg);
    } catch (e) {
      logger.log('warn', {text: message.text(), msgData, err: e.message});
      await messageService.sendMessageByMsg(message, '我好像有点问题，重问一下试试！');
    }
  }
};
