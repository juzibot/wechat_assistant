/**
 * Create by geekeryoung on 2020/3/15
 *
 * 请求组件
 */

const {HttpClient2} = require('urllib');
const HttpAgent = require('agentkeepalive');

const logger = require('./logger');
const config = require('../../config/default.config');

const {HttpsAgent} = HttpAgent;

const httpClient = new HttpClient2({
  retry: 2,
  timing: true,
  retryDelay: 0,
  isRetry: false,
  rejectUnauthorized: false,
  agent: new HttpAgent(),
  httpsAgent: new HttpsAgent(),
  timeout: [parseInt(config.requestConnectTimeout), parseInt(config.requestResponseTimeout)],
});

httpClient.on('response', (info) => {
  const {req, res, error} = info;
  let data = {
    event: error ? 'requestError' : 'request',
    method: req.options.method,
    url: req.url,
    headers: req.options.headers,
    data: req.args.data,
    error: error,
    respStatus: res.status,
    respData: res.data,
    time: res.rt
  };
  // 如果有错误则保留错误信息 否则删除 error 字段
  !error ? delete data.error : null;
  logger.log('info', data);
});

module.exports = httpClient;
