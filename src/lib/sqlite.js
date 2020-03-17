/**
 * Create by geekeryoung on 2020/3/15
 *
 * 数据库组件
 */

const path = require('path');
const Database = require('better-sqlite3');

const config = require('../../config/default.config');

const db = new Database(path.join(config.dbPath, config.dbName));

module.exports = db;
