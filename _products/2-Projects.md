---
title: Projects
slug: projects
color: 27A9E1
desc: Cool things I'm working on
background: /assets/img/tufts-candles.png
---

{% for post in site.categories.projects %}
<div id="{{ post.url }}">
{{ post.content | markdownify }}
</div>
{% endfor %}