# assistant

- 主要用于接收用户的消息，并做出相应的操作

### Basic environment

- Node.js 10+
- SQLite 3

### Deploy

```bash
$ npm i

// start
$ pm2 start config/ecosystem.config.js

// stop
$ pm2 stop assistant
```
