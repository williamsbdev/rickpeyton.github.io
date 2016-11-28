---
layout: post
category: technology
---
<img alt="How To Quickly Set Up Additional Apache Virtual Hosts on Ubuntu" src="/images/how-to-quickly-set-up-additional-apache-virtual-hosts-on-ubuntu.jpg">

This article assumes that you have previously setup a virtual host on your ubuntu server and that you are looking to quickly set up an additional apache host.

Create a New Directory. The -p allows you to simultaneously establish subdirectories.

    mkdir -p time.rickpeyton.com/{public,backup,log}

Toss in some placeholder text

    echo "time.rickpeyton.com" > ~/public/time.rickpeyton.com/public/index.php

Set the home directory to readable and accessible

    sudo chmod a+rx ~

Set the public directory to readable and accessible

    sudo chmod -R a+rx ~/public

Create a new virtual hosts file in /etc/apache2/sites-available - copy an existing virtual host if possible

    sudo cp example1.rickpeyton.com time.rickpeyton.com

Use nano to replace all instances of example1 with time (control + \ initiates find and replace in nano)

    sudo nano time.rickpeyton.com

(if applicable) Add the new site to the log rotate

    sudo nano /etc/logrotate.d/virtualhosts

Enable the new virtual host

    sudo a2ensite time.rickpeyton.com (a2dissite to disable)

Reload Apache

    sudo service apache2 reload
