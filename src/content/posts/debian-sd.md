---
title: "Debian 12 安装 Stable Diffusion 详细教程"
date: 2024-03-19
description: "从零开始在 Debian 12 上安装 Stable Diffusion：安装 NVIDIA 驱动、CUDA、配置 Python 环境并启动 WebUI。"
tags: ["Linux", "AI", "Stable Diffusion"]
cover: "/covers/ai.svg"
---

Stable Diffusion 是目前最流行的开源 AI 绘画模型。本文记录在 Debian 12 上从零安装的全过程。

## 硬件要求

- NVIDIA 显卡，显存 6G 以上（推荐 8G+）
- 至少 16G 内存
- 20G 磁盘空间

## 安装 NVIDIA 驱动

```bash
sudo apt update
sudo apt install nvidia-driver firmware-misc-nonfree
sudo reboot
```

重启后验证：

```bash
nvidia-smi
```

## 安装 CUDA

去 NVIDIA 官网下载 CUDA Toolkit，或者直接用 apt：

```bash
sudo apt install nvidia-cuda-toolkit
```

## 部署 Stable Diffusion WebUI

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui
./webui.sh
```

首次运行会自动创建虚拟环境并安装依赖，等待即可。

## 启动与使用

浏览器访问 `http://localhost:7860`，输入提示词即可生成图片：

```
a beautiful landscape, sunset, mountains, highly detailed
```

## 常见问题

1. **显存不足**：启动时加 `--medvram` 参数
2. **下载模型慢**：设置 `HF_ENDPOINT=https://hf-mirror.com` 使用国内镜像
3. **界面卡顿**：确认驱动与 CUDA 版本匹配

## 总结

整个过程核心就是三件事：驱动、CUDA、WebUI。装好之后就可以尽情发挥创意了。
