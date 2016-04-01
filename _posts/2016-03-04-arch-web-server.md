---
layout: post
title: Arch Web Server
date: 2016-03-04 08:37:00
---

When a [LAMP server](/2016/02/17/lamp-setup/) just isn't enough, you may as well go all-out with nginx, HHVM, and MariaDB on Arch Linux.

Start by installing and enabling the services:

```bash
sudo pacman -S nginx hhvm mariadb
sudo systemctl enable nginx
sudo systemctl enable hhvm
sudo systemctl enable mysqld
```

Run the initial setup for MariaDB:

```bash
mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

Create a new file `/etc/nginx/hhvm.conf`:

```nginx
location ~ \.php$ {
  fastcgi_pass   127.0.0.1:9000;
  fastcgi_index  index.php;
  fastcgi_param  SCRIPT_FILENAME $request_filename;
  include        fastcgi.conf;
}
```

Add a line to any nginx servers that need PHP:

```nginx
include hhvm.conf;
```

After your MariaDB and nginx are configured, start your services:

```bash
sudo systemctl start nginx
sudo systemctl start hhvm
sudo systemctl start mysqld
```

Now you should be good to go!
