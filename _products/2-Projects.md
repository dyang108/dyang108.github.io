---
title: Projects
slug: projects
color: 27A9E1
desc: Cool things I'm working on
background: /assets/img/tufts-candles.png
---

{% for post in site.categories.projects %}
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
