---
title: Articles
slug: articles
---

{% for post in site.categories.articles %}
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
