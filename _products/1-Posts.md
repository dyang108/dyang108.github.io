---
title: Blog
slug: blog
color: F7931D
desc: The latest posts from Derick
background: /assets/img/puerto-rico-sunset.JPG
---

### *Check here for the latest from Derick*

{% for post in site.categories.blog %}
<div id="{{ post.url }}">
<span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
{{ post.content | markdownify}}
</div>
{% endfor %}
