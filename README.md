# 介绍
ding drive accelerator demo.

## 依赖
- mongoDB
- Nodejs

## 使用

insert 数据
```
node cloud/src/init_db.js
```

运行 cloud
```bash
npm run cloud
```

运行 dda
```bash
npm run dda
```

运行 test
```bash
npm run test
```

## 流程
Client 访问 DDA：
1. 明文： clientId、 request
2. token： ddaToken
3. 密文： encryptedData