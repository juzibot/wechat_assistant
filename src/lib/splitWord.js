/**
 * Create by geekeryoung on 2020/3/15
 *
 * 分词相关请求
 */

const httpClient = require('./request');

module.exports = {
  /**
   * 提取一句话中的重要词语
   * @param data = {url,doc,str}
   * @return {Promise<Array>} [xxx,xx,xxx,...]
   */
  async splitWord(data) {
    const {url, doc, str} = data;
    let resp = await httpClient.request(url + '/get.php', {
      method: 'GET',
      dataType: 'json',
      contentType: 'json',
      data: {
        source: str,
        param1: doc,
        param2: 0,
        json: 1,
      }
    });
    let result = resp.data.toString();
    return result != 'error' ? JSON.parse(result).map((item) => item.t) : [];
  }
};
