---
layout: page
---

{% assign today = site.time | date: '%s' %}
{% assign first_post = '08-09-2009 04:00:00' | date: '%s' %}
{% assign first_post_since = today | minus: first_post %}
{% assign first_post_days_since = first_post_since | divided_by: 60 | divided_by: 60 | divided_by: 24  %}

第一篇日志写于 {{ first_post_days_since }} 天前。

目前一共写了 {{ site.posts | size }} 篇日志。

谢谢你来看我的博客。
