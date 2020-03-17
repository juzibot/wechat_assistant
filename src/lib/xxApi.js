/**
 * Create by geekeryoung on 2020/3/15
 *
 * 内部系统的api
 */

const nanoid = require('nanoid');

const httpClient = require('./request');

module.exports = {
  /**
   * 查询 status 结果
   * @param data = {phone}
   * @return {Promise<Object>}
   */
  async queryStatus(data) {
    const {url, requestId} = data;
    let resp = await httpClient.request(url + '/api/count', {
      method: 'GET',
      dataType: 'json',
      contentType: 'json',
      headers: {'x-trace-id': nanoid()},
      data: {requestId},
    });
    return resp.data;
  },

  /**
   * 查询 status 结果
   * @param data = {phone,email}
   * @return {Promise<Object>}
   */
  async queryStatusDetail(data) {
    const {url, requestId} = data;
    let resp = await httpClient.request(url + '/api/detail', {
      method: 'GET',
      dataType: 'json',
      contentType: 'json',
      headers: {'x-trace-id': nanoid()},
      data: {requestId},
    });
    return resp.data;
  },
};
