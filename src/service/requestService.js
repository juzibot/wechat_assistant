/**
 * Create by geekeryoung on 2020/3/14
 *
 * request相关操作
 */

const xxApi = require('../lib/xxApi');
const config = require('../../config/default.config');

module.exports = {

  /**
   * 查询 status 统计结果
   * @param phone
   * @return {Promise<Object>}
   */
  async queryStatus(phone) {
    let result = await xxApi.queryStatus({url: config.customSystemUrl, phone});
    // 整理返回消息
    if (result.statusCode == 200) {
      return {
        error: false,
        ...result.body.data
      }
    } else {
      return {
        error: true,
        code: result.error.code || 500
      }
    }
  },

  /**
   * 查询 status 详细结果
   * @param phone
   * @param email
   * @return {Promise<Object>}
   */
  async queryStatusDetail(phone, email) {
    let result = await xxApi.queryStatusDetail({url: config.customSystemUrl, phone, email});
    // 整理返回消息
    if (result.statusCode == 200 && result.body.data.results.length > 0) {
      return {
        error: false,
        ...result.body.data.results[0]
      }
    } else {
      return {
        error: true,
        code: 404
      }
    }
  }

};
