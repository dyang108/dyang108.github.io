#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: send-post.sh URL CATEGORY"
    exit 1
fi

curl -X POST http://dyang108-blog-email.herokuapp.com/send -H "Content-Type: application/json" --data  "{\"url\":\"$1\",\"category\":\"$2\",\"pw\":\"FZeKJ5axc0s05gq\"}"
