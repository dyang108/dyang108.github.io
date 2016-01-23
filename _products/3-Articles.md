---
title: Articles
slug: articles
color: D65277
desc: Things I read
background: /assets/img/maine-lake.png
---

### *this is a description for echo*

{% for post in site.categories.articles %}
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
