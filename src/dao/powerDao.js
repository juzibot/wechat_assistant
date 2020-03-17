/**
 * Create by geekeryoung on 2020/3/15
 */

const db = require('../lib/sqlite');

module.exports = {
  /**
   * 根据 value 查询字段名
   * @param data = {?id,?userId,?actionId}
   * @return {Promise<Object>} {...power_tb}
   */
  queryPower(data) {
    const {id, userId, actionId} = data;
    let sql = 'select * from power_tb where 1=1 ';
    if (id) {
      sql += 'and id = @id ';
    }
    if (userId) {
      sql += 'and user_id = @userId ';
    }
    if (actionId) {
      sql += 'and action_id = @actionId ';
    }
    let stmt = db.prepare(sql);
    return stmt.all({id, userId, actionId});
  }
};
