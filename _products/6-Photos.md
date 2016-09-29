---
title: Photos
slug: photos
color: 91268F
desc: Things I see
background: /assets/img/maine-fall.JPG
---

## *There's no content here yet...:*

{% for post in site.categories.photos %}
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
