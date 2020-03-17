/**
 * Create by geekeryoung on 2020/3/14
 *
 * 权限相关操作
 */

const powerDao = require('../dao/powerDao');

module.exports = {

  /**
   * 校验 action 权限 判断当前用户是否有权限作此操作
   * @param userId 微信ID
   * @param actionId
   * @return {Promise<Object>}
   */
  async verifyActionPower(userId, actionId) {
    // 先使用 actionId 查询
    let result = powerDao.queryPower({actionId});
    // 如果查到 则判断 userId 是否在其中 否则默认放行
    if (result && result.length > 0) {
      // 如果查到则放行 未查到则返回失败
      for (let item of result) {
        if (item.user_id == userId) return true;
      }
      return false;
    }
    return true;
  },

};
