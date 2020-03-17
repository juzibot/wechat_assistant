/**
 * Create by geekeryoung on 2020/3/14
 *
 * 收到好友邀请相关操作
 */

const config = require('../../config/default.config');
const messageService = require('../service/messageService');

module.exports = {
  /**
   * 用于接收好友邀请 并处理
   * 收到好友邀请时 不做处理 直接通知管理员操作
   * @param bot
   * @param friendship
   * @return {Promise<void>}
   */
  async index(bot, friendship) {
    let contact = friendship.contact();
    let manager = bot.Contact.load(config.managerId);
    await messageService.sendMessage(manager, `收到：${contact.name()}的好友邀请，备注为：${friendship.hello() || '无'}`);
  }
};
