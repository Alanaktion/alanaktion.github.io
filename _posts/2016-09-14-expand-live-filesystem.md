---
layout: post
title: Expand a live ext4 filesystem
date: 2016-09-14 15:36:00
---

So maybe you let your OS installer configure your partitions for you because you're lazy like me. And maybe you realized it created a 16 GB swap partition on your tiny SSD. And maybe you wanted `/` to use that 16 GB.

Luckily, Linux is awesome.

```
root@box:~# lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 111.8G  0 disk
├─sda1   8:1    0   512M  0 part /boot/efi
├─sda2   8:2    0  97.3G  0 part /
└─sda3   8:3    0  15.9G  0 part [SWAP]
```

`/dev/sda2` is the partition we want to extend. We'll use gdisk.

First, list the partitions to be sure we're starting in the right place. Make a note of the start sector for the partition you want to extend, as we'll be deleting it and creating a new one in it's place.

```
root@box:~# gdisk /dev/sda
Command (? for help): p

Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048         1050623   512.0 MiB   EF00  EFI System Partition
   2         1050624       190093083    97.3 GiB   8300  Linux filesystem
   3       190093084       234441614    15.9 GiB   8200  Linux swap
```

Next we'll delete the swap and root partitions.

```
Command (? for help): d
Partition number (1-3): 3
Command (? for help): d
Partition number (1-2): 2
```

Create a new partition. Use the start sector from old partition as the first sector on the new one, leaving the default values for the last sector and partition type.

```
Command (? for help): n
Partition number (2-128, default 2): 2
First sector (34-234441614, default = 1050624) or {+-}size{KMGTP}: 1050624
Last sector (1050624-234441614, default = 234441614) or {+-}size{KMGTP}:
Current type is 'Linux filesystem'
Hex code or GUID (L to show codes, Enter = 8300):
```

Print the new partition table to make sure everything looks right.

```
Command (? for help): p

Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048         1050623   512.0 MiB   EF00  EFI System Partition
   2         1050624       234441614   111.3 GiB   8300  Linux filesystem
```

If it's all good, write the new partition table to disk!

```
Command (? for help): w

Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
PARTITIONS!!

Do you want to proceed? (Y/N): y
```

Your new partition table is written, but the system won't recognize it everywhere yet. We'll partprobe to fix this.

```
partprobe
```

Now your new partition table should be live.

```
root@box:~# lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 111.8G  0 disk
├─sda1   8:1    0   512M  0 part /boot/efi
└─sda2   8:2    0 111.3G  0 part /
```

Finally, we'll resize the filesystem to fill the new partition.

```
resize2fs /dev/sda2
```
