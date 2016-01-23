---
title: Blog
slug: blog
color: F7931D
desc: The latest posts from Derick
background: /assets/img/puerto-rico-sunset.JPG
---

### *Check here for the latest from Derick*

{% for post in site.categories.blog %}
<div>
<span class="post-meta">
{{ post.date | date: "%b %-d, %Y" }}
</span>
<a class="post-link" href="{{ post.url }}">
{{ post.title }}
</a>
<div class="content-preview-wrapper">
<div class="content-preview">
{{ post.content | markdownify }}
</div>
</div>
</div>
{% endfor %}
