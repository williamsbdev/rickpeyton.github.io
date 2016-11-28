---
layout: post
category: technology
---
I like to test Wordpress upgrades and template changes on a dev site on the same server as my live install. I'll use a url like alpha.example.com to set everything up and then copy it all over to go live. This MySQL query provides a quick fix to make sure you don't leave any bad links trailing behind.

The same would also work if you ever wanted to change to a new URL in general.

    UPDATE wp_posts SET post_content = REPLACE(post_content, 'alpha.example.com', 'example.com');
