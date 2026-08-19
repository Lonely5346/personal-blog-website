---
title: "WordPress Docker 镜像添加 Memcached 支持"
date: 2023-11-16
description: "给 WordPress 官方 Docker 镜像安装 Memcached PHP 扩展，开启对象缓存加速站点。"
tags: ["WordPress", "Docker", "优化"]
---

WordPress 官方 Docker 镜像默认没有安装 Memcached 扩展，导致无法使用对象缓存。本文记录如何给镜像打补丁。

## 编写 Dockerfile

基于官方镜像重新构建：

```dockerfile
FROM wordpress:php8.2-apache

RUN apt-get update && apt-get install -y libmemcached-dev zlib1g-dev \
    && pecl install memcached \
    && docker-php-ext-enable memcached
```

## 构建并启动

```bash
docker build -t wordpress-memcached .
docker run -d --name wp \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=mysql \
  wordpress-memcached
```

## 启用对象缓存

安装插件后，在 `wp-config.php` 中添加：

```php
define("WP_CACHE", true);
define("WP_MEMCACHED_SERVERS", "127.0.0.1:11211");
```

## 验证效果

通过 `docker exec wp php -m | grep memcached` 确认扩展已加载，再对比开启前后的首页响应时间，通常能有 3-5 倍的提升。

## 总结

给 WordPress 加 Memcached 后，动态页面响应速度提升非常明显，推荐所有 WordPress 站点都加上。
