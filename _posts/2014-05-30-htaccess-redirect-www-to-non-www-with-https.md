---
layout: post
category: technology
---
Do you know of a better way to do this? Drop me a note on [twitter](twitter.com) or [contact me](/contactme.html).

    RewriteEngine On
    RewriteCond %{HTTPS} off [OR]
    RewriteCond %{HTTP_HOST} !^rickpeyton.com$ [NC]
    RewriteRule ^ https://rickpeyton.com%{REQUEST_URI} [R=301,L,NE]
