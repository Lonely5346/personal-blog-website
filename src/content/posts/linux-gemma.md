---
title: "在 Linux 上本地部署 Gemma 开源大模型"
date: 2024-03-20
description: "本文介绍了如何在 Linux 系统上本地部署 Gemma 模型：配置环境、安装 Ollama、拉取模型并测试对话。"
tags: ["Linux", "AI", "大模型"]
cover: "/covers/linux.svg"
---

Gemma 是 Google DeepMind 团队发布的开源大语言模型。本地部署可以完全掌控数据，还不用花一分钱 API 费用。

## 环境准备

- 一台 Linux 服务器或本地电脑（建议 16G 以上内存）
- NVIDIA 显卡（可选，有显卡推理更快）
- 磁盘空间 10G 以上

## 安装 Ollama

Ollama 是目前最方便的大模型本地运行框架：

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

安装完成后启动服务：

```bash
systemctl start ollama
```

## 拉取并运行 Gemma

```bash
# 拉取 7B 参数版本（量化）
ollama pull gemma:7b

# 开始对话
ollama run gemma:7b
```

## 测试效果

输入一句"你好，介绍一下你自己"，模型会返回一段完整的自我介绍。整个部署过程不到十分钟。

## 进阶：接入 API

Ollama 默认监听 `11434` 端口，可以直接用 OpenAI 兼容接口调用：

```bash
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"gemma:7b","messages":[{"role":"user","content":"你好"}]}'
```

> 提示：显存不足时可以选择 `gemma:2b` 小模型，速度更快。

## 总结

本地部署大模型的步骤非常简单：装 Ollama → 拉模型 → 对话。后续可以接入各类聊天前端（如 Open WebUI），打造自己的私人 AI 助手。
