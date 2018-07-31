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
1. 明文部分： clientId、 request
2. 密文部分： encryptedData
3. 请求头部： ddaToken

在访问 DDA 之前，DDA会将 Client 传过来的 ddaToken 与 clientId 请求 Cloud 检验是否有权限。
