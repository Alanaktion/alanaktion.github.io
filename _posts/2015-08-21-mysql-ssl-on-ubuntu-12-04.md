---
layout: post
title: MySQL SSL on Ubuntu 12.04
date: 2015-08-21 14:06:11
---
Ubuntu 12.04's included libssl is incompatible with the default mysql verison provided. This isn't how to fix that, but a warning not to try. Just use 14.04 LTS.

If you did set up SSL on a 12.04 server, you'll likely run into issues exporting your database. If you get errors like these, just disable SSL.

```
root@db:/# innobackupex --user=root --password=MyPass /home/backup/rep-transfer
150821 13:54:35  innobackupex: Connecting to MySQL server with DSN 'dbi:mysql:;mysql_read_default_group=xtrabackup' as 'root'  (using password: YES).
innobackupex: Error: Failed to connect to MySQL server: DBI connect(';mysql_read_default_group=xtrabackup','root',...) failed: SSL connection error: error:00000001:lib(0):func(0):reason(1) at /usr/bin/innobackupex line 2949

root@db:/# mydumper --database=db_name --user=root --password=MyPass --host=localhost
** (mydumper:28499): CRITICAL **: Error connecting to database: SSL connection error: error:00000001:lib(0):func(0):reason(1)
```

Commenting out `ssl-ca`, `ssl-cert`, `ssl-key` and `ssl-cipher` lines in your `/etc/mysql/my.cnf` file and restarting the service with `sudo service mysql restart` should allow you to export again.
