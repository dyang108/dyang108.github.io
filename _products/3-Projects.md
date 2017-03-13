---
title: Projects
slug: projects
---

{% for post in site.categories.projects %}
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
