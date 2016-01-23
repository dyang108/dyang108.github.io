---
title: Articles
slug: articles
color: D65277
desc: Things I read
background: /assets/img/maine-lake.png
---

### *this is a description for echo*

{% for post in site.categories.articles %}
<div id="{{ post.url }}">
{{ post.content | markdownify }}
</div>
{% endfor %}