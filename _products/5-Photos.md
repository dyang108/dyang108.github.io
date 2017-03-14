---
title: Photos
slug: photos
desc: f1c40f
---

{% for post in site.categories.photos %}
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
