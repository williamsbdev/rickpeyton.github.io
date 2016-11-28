---
layout: post
category: technology
---
Whenever I want to try a new idea for my website, or just want to test something without messing up my existing sites, I create a new subdomain. But it is just infrequent enough that I find myself having to search Google for key commands in the process each time.

Hopefully this post will expedite that process.

Assume that all domains are kept in ~/public_html

If you want to make an exact duplicate of the existing domain

    cp -a existingdomain.com development.existingdomain.com

If you want to start fresh with a new domain or subdomain

    cd ~
    mkdir -p public_html/development.existingdomain.com/{public,private,log,cgi-bin,backup}

Make sure that the new directories are accessible

    sudo chmod -R a+rX ~/public_html

Add this domain to your virtual host logs rotation

    sudo nano /etc/logrotate.d/virtualhosts

Add to line 1

    /home/homeuser/public_html/development.existingdomain.com/log/*log

Create a virtual hosts vile.

    cd /etc/apache2/sites-available
    sudo cp existingdomain.com development.existingdomain.com

edit your new development.existingdomain.com host file with the proper paths

    sudo nano development.existingdomain.com
    # Place any notes or comments you have here
    # It will make any customization easier to understand in the weeks to come
    # domain: development.existingdomain.com
    # public: /home/homeuser/public_html/development.existingdomain.com/
    <VirtualHost *:80>
    # Admin email, Server Name (domain name) and any aliases
    ServerAdmin homeuser@gmail.com
    ServerName  development.existingdomain.com
    # Index file and Document Root (where the public files are located)
    DirectoryIndex index.php index.html
    DocumentRoot /home/homeuser/public_html/development.existingdomain.com/public
    # Custom log file locations
    LogLevel warn
    ErrorLog  /home/homeuser/public_html/development.existingdomain.com/log/error.log
    CustomLog /home/homeuser/public_html/development.existingdomain.com/log/access.log combined
    </VirtualHost>

Activate your new site and reload Apache

    sudo /usr/sbin/a2ensite development.existingdomain.com (or a2dissite to turn off)
    sudo /etc/init.d/apache2 reload

Run logrotate and make sure it worked by checking your log folder

    sudo /usr/sbin/logrotate /etc/logrotate.conf
