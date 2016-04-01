---
layout: post
title: LAMP Sever Setup
date: 2016-02-17 11:10:00
---

Sometimes you have a fancy VPS when you really just want a web server. This guide goes through the process of setting up a basic LAMP server with WordPress on Ubuntu.

## LAMP Setup

To start out, you'll need to install some packages. This step will ask you to create a database password, you should pick something secure that you can remember.

```bash
sudo apt-get install apache2 php5 php5-gd php5-mysql mysql-server-5.6 wget
```

After installing your packages, enable the rewrite module for pretty URLs in WordPress and other apps that use it.

```bash
sudo a2enmod rewrite
```

You should then edit your Apache configuration file. You'll need to change the `AllowOverride None` line in the `<Directory /var/www>` block from `None` to `All` in order for .htaccess files to work properly.

```bash
sudo nano /etc/apache2/apache2.conf
```

Finally, restart Apache to apply your new configuration.

```bash
sudo service apache2 restart
```

## WordPress Setup

Installing WordPress follows a pretty typical process that should work for most web apps and custom sites. We'll start by creating a database. Run the command below, entering your database password chosen during the package installation.

```bash
mysql -uroot -p
```

Once in the MySQL command line, we'll create a new database and user. Replace "Passw0rd" with a secure password. You'll use this username ("wordpress") and password to install WordPress later.

```sql
CREATE DATABASE `wordpress`;
CREATE USER 'wordpress'@'localhost' IDENTIFIED BY 'Passw0rd';
GRANT ALL ON `wordpress`.* TO 'wordpress'@'localhost';
FLUSH PRIVILEGES;
\q
```

After creating a database, we'll download and unzip WordPress.

```bash
cd /var/www
sudo wget https://wordpress.org/latest.zip
sudo unzip latest.zip
sudo chown -R www-data: wordpress
sudo chmod -R 755 wordpress
```

We need to tell Apache to run our WordPress code, so next we'll create a new VirtualHost.

```bash
sudo nano /etc/apache2/sites-available/wordpress.conf
```

Enter the following text in the new file, replacing `example.com` with your domain (you should point the domain to the server's IP address as well):

```apache
<VirtualHost *:80>
ServerName example.com
DocumentRoot /var/www/wordpress
</VirtualHost>
```

If you want additional domains or subdomains to point to this website as well, you can add a `ServerAlias` line after `ServerName`, like this:

```apache
ServerAlias www.example.com example.org
```

Now that your VirtualHost is created, enable it and reload Apache.

```bash
sudo a2ensite wordpress
sudo service apache2 reload
```

At this point, if your domain is set up correctly, you should be able to browse to your website and install WordPress. You'll need the database username and password you set up earlier, and the database hostname should be `localhost`.

Once installed, you should go into WordPress's admin panel and change the Permalink style (Settings > Permalinks) to something other than the default to take advantage of Apache's URL rewrites.
