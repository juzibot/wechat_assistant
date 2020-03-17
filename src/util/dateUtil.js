/**
 * Create by geekeryoung on 2020/3/15
 *
 * 时间相关工具
 */

const moment = require('moment');

module.exports = {
  dateToString(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },

  secondsTimestamp(date) {
    return moment(date).format('X');
  },

  millisecondTimestamp(date) {
    return moment(date).format('x');
  }
};
