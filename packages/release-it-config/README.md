# @jiehousekeeper/release-it-config

A release-it configuration for JieHousekeeper projects.

## Installation

.npmrc

```bash
//@jiehousekeeper:registry=https://npm.pkg.github.com/:_authToken=your_token
```

```bash
# 取得 github.com 公鑰，加入專案的 secrets.KNOWN_HOSTS
ssh-keyscan github.com

# 生成一對 RSA 密鑰，並將公鑰加入帳戶的 SSH keys，私鑰加入專案的 secrets.SSH_KEY
# 公鑰 cat /home/user/.ssh/id_rsa.pub
# 私鑰 cat /home/user/.ssh/id_rsa
ssh-keygen -t rsa -b 4096 -C "your_email@gmail.com"
```
