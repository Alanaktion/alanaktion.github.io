---
layout: post
title: MySQL Backups
date: 2016-10-18 13:35:00
excerpt: Flexible backup methods with mysqldump, and crazy-fast multi-threaded backups using mydumper
---

MySQL is pretty nice for a free, Open Source RDBMS. Before trying any kind of management, you should totally have a `.my.cnf` file in your `~`. Put your username and password for localhost there, and then remove read permissions from everyone but yourself. This file specifies the default options to use with MySQL command line tools, making them much easier to work with, and avoiding having to repeatedly type in your password or accidentally letting it end up in a history file somewhere.

```
[mysql]
user=root
password=letmein
```

### Flexible backups with mysqldump

The mysqldump tool is fairly straightforward, but you're likely not using it to it's full potential.

To make working with your export easier (making structure adjustments and such), it's often useful to export the schema and data separately. A `--no-data` dump will include table schemas and view declarations, while a `--no-create-info` backup will only include table data.

```bash
mysqldump --no-data dbname | gzip > dbname-schema.sql.gz
mysqldump --no-create-info dbname | gzip > dbname.sql.gz
```

If you plan on changing your column ordering or adding columns from your schema file, your inserts in the data backup will no longer import correctly. To work around this, you can use the `--complete-insert` flag, which includes column names in the inserts, ensuring they restore properly as long as all the columns backed up are still present in the new table.

```bash
mysqldump --complete-insert --no-create-info dbname | gzip > dbname.sql.gz
```

Restoring views to a new server can fail if the view's DEFINER is not a user on the new system. If you're going to be importing the database on a different system with potentially different users, you can use grep to filter out the DEFINER rows, ensuring views import without errors.

```bash
mysqldump --no-data dbname | grep -v "50013 DEFINER" | gzip > dbname-schema.sql.gz
```

I pretty much always pipe mysqldump through gzip since there's no good reason to keep an uncompressed export sitting around. Restoring gzipped backups is very simple to do in-place with the help of `zcat`.

```bash
zcat dbname-schema.sql.gz | mysql dbname
zcat dbname.sql.gz | mysql dbname
```

If you've got any stored procedures, triggers, or functions in your database, these will only be backed up if you use the `--routines` flag. I prefer to keep these in another file.

```bash
mysqldump --routines --no-data --no-create-info dbname | gzip > dbname-routines.sql.gz
```

If you're using `BLOB` columns with unfiltered data, you may run into issues restoring backups of that data. To work around this, you can store those in hexadecimal which, while larger by default, shouldn't take up too much more space once gzipped. Enable hex encoding with the `--hex-blob` flag.

```bash
mysqldump --hex-blob --no-create-info dbname | gzip > dbname.sql.gz
```

If your database consists entirely of InnoDB tables, you have the option of using a transactional backup, which ensures data integrity without requiring table-level locks! This can be enabled with the `--single-transaction` flag, but keep in mind any non-InnoDB tables will not be locked, and may be backed up inconsistently.

```bash
mysqldump --single-transaction --no-create-info dbname | gzip > dbname.sql.gz
```

### Multi-threaded backups with mydumper

If all you're looking for is a crazy-fast backup of a large database's structure and data, you should be using the amazing [`mydumper`](https://launchpad.net/mydumper) tool, which uses a multi-threaded approach, backing up each table in a separate thread.

It's fairly straightforward to use. Let's do a gzip-compressed single-database backup.

```bash
mydumper -c -B dbname -d export_dir
```

Restoring a mydumper backup is quite simple

```bash
myloader -d export_dir
```

Mydumper also has powerful options like regex table name matching and row-count file splitting. Read the `man` page for details on everything `mydumper` and `mysqldump` can do.
