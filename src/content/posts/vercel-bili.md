---
title: "利用 Vercel 免费解除 B 站区域限制"
date: 2023-12-29
pinned: true
description: "使用 Vercel 的 Serverless 函数作为代理，免费解除 B 站部分番剧的区域限制。"
tags: ["Vercel", "教程", "B站"]
---

B 站部分番剧存在区域限制。之前用阿里云函数的方法即将到期，这次改用 Vercel 的免费 Serverless 服务，同样能解决问题，而且完全免费。

## 原理

Vercel Serverless 函数部署在海外节点，通过函数转发请求即可绕过区域判断。

## 部署步骤

1. 注册 GitHub 账号，把代理项目代码推送到仓库
2. 注册 Vercel 并绑定 GitHub 账号
3. 在 Vercel 中导入项目，点击 Deploy
4. 等待部署完成，获得一个 `xxx.vercel.app` 的域名

## 配置播放器

在浏览器插件或播放器中填入部署好的代理地址即可。

## 注意事项

- 免费版每月有 100GB 流量，个人使用完全够
- 注意遵守相关法律法规与平台条款

## 总结

Vercel 的免费额度非常慷慨，用来做代理、部署博客、跑 API 都很好用。
