/**
 * Create by geekeryoung on 2020/3/13
 */

const {Wechaty} = require('wechaty');
const QrcodeTerminal = require('qrcode-terminal');
const {PuppetPadplus} = require('wechaty-puppet-padplus');

const logger = require('./lib/logger');
const config = require('../config/default.config');

const message = require('./model/message');
const friendship = require('./model/friendship');

// 使用ipad协议
const puppet = new PuppetPadplus({token: config.wechatyToken});

// 创建一个机器人
const bot = new Wechaty({name: config.botName, puppet});

bot.on('scan', async (qrcode, status) => {
  QrcodeTerminal.generate(qrcode, {small: true});
  logger.log('info', `Scan QR Code to login: ${status}`);
});

bot.on('login', async (user) => {
  logger.log('info', `${user.name()} already logged in`);
});

// 收到消息事件
bot.on('message', async (msg) => {
  await message.index(bot, msg)
});

// 收到好友邀请事件
bot.on('friendship', async (fs) => {
  await friendship.index(bot, fs)
});

bot.start().then(() => {
  logger.log('info', 'bot start');
});
