/**
 * Create by geekeryoung on 2020/3/15
 */

const db = require('../lib/sqlite');

module.exports = {
  /**
   * 根据 value 查询字段名
   * @param value
   * @return {Promise<Object>} {name}
   */
  queryKeywordByValue(value) {
    let sql = 'select name from keyword_tb where value = ?';
    let stmt = db.prepare(sql);
    return stmt.get(value);
  }
};
