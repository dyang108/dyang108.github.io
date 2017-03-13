---
title: Blog
slug: blog
---

{% for post in site.categories.blog %}
<div>
<a class="post-link" href="{{ post.url }}">
{{ post.title }}
</a>
<div class="post-meta">
{{ post.date | date: "%b %-d, %Y" }}
</div>
{{ post.content | markdownify }}
</div>
{% endfor %}
