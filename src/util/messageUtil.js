/**
 * Create by geekeryoung on 2020/3/14
 *
 * 消息相关工具
 */

const keyUtil = require('./keyUtil');
const config = require('../../config/default.config');

module.exports = {

  /**
   * 格式化消息
   * @param msg
   */
  formatMessage(msg) {
    let msgTemp = msg, msgDta = {};
    // 清理 @我 相关字符串
    msgTemp = msgTemp.replace(`@${config.botAlias}`, '');
    // 替换 中文： 为英文:
    msgTemp = msgTemp.replace(/：/ig, ':');
    // 清理开头结尾空格
    msgTemp = msgTemp.trim();
    // 通过 \n 切分成数组 提取第一行
    msgTemp = msgTemp.split('\n');
    msgDta.action = msgTemp.shift();
    // 通过换行符切分成数组 再将数组转为 key-value对象
    for (let item of msgTemp) {
      let key = item.split(':')[0];
      msgDta[key] = item.substring(key.length + 1, item.length);
    }
    return msgDta
  },

  /**
   * 将消息状态转为中文
   * @param code
   */
  customMsgStateToZh(code) {
    // 遍历状态码 如果匹配则返回响应code说明
    for (let key of Object.keys(keyUtil.customMsgState)) {
      if (keyUtil.customMsgState[key].code == Number.parseInt(code)) {
        return keyUtil.customMsgState[key].value;
      }
    }
    return keyUtil.customMsgState.unknown.value;
  },

};
