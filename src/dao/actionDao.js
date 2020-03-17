/**
 * Create by geekeryoung on 2020/3/15
 */

const db = require('../lib/sqlite');

module.exports = {
  /**
   * 根据 value 查询字段名
   * @param value {String|Array}
   * @return {Promise<Object>} {...action_tb}
   */
  queryActionByKeyword(value) {
    let sql = 'select * from action_tb where keyword like ?';
    let keyword = '';
    // 生成组合成的 keyword
    [].concat(value).forEach((word) => {
      keyword += `%${word}%`;
    });
    let stmt = db.prepare(sql);
    return stmt.get(keyword);
  }
};
