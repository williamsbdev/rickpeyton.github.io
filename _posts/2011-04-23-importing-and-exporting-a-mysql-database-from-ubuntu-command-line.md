---
layout: post
category: technology
---
Quick and easy command line codes for doing a mysql database dump and import off of the command line in Ubuntu.

Output

    mysqldump --opt -Q -uUSERNAME -p DATABASENAME > ./OUTPUT-dbNAME.SQL

Input

    mysql -uUSERNAME -p DATABASENAME < ./INPUT-dbNAME.SQL
