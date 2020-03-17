# assistant

- 微信助手主要负责回应用户的查询，并查询内部系统返回状态

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
