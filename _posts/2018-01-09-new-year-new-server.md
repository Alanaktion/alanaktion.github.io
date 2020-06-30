---
layout: post
title: New Year, New Server
date: 2018-01-09 21:40:00
excerpt: After reaching 98% disk usage, it was definitely time to rebuild my home file server.
---

*TL;DR: 4x8TB WD + 2x3TB Seagate on Arch w/ btrfs RAID10 is fun.*

I'm obsessive about keeping data. I pretty much never delete anything, and I've started archiving data from other sources that could potentially disappear in the future like websites, YouTube videos, and even old Operating System installer images. Doing something like this takes quite a bit of disk space, and my old server with only 6 terabytes of usable redundant storage was just not cutting it. I had only a few gigabytes left available on that server, plus a few terabytes of non-redundant data on my main desktop PC with nowhere better to move the files, so I decided it was finally time to rebuild.

The first step was to find the best value I could on large hard drives. As a frequent lurker on [r/datahoarder](https://reddit.com/r/datahoarder), I had seen people mention that the WD easystore 8 TB drives were frequently on sale for around 50% off at Best Buy, and often had proper WD Red drives inside. I set up an IFTTT recipe to notify me when the prices changed on the Best Buy website, and got 4 drives for only $150 a piece, which is quite a savings over pretty much any other 8 TB drive on the market. Unfortunately, I wasn't thorough on checking the model numbers on the boxes, so I ended up with the generic non-Red drives once I opened up the enclosures, but since I'm paranoid and was planning on running RAID10 with checksums anyway, I didn't really care that much.

Weirdly though, two of the four drives wouldn't power on with a standard SATA power connector. After a bit of research, there seemed to be two solutions for the issue, with one a bit more elegant than the other, but both a bit weird. Some people found that you could add a resistor between certain leads on the cable to trick the drive into powering on, while some others found that using a Molex to SATA power adapter seemed to fix the problem as well. A hacky combination of adapters resulting in a SATA > Molex > SATA > 4-way SATA splitter, and the drives were up and running! Now for the fun part.

My last server, Vista, ran Ubuntu 14.04 with mdadm RAID10 on 4x 3 TB HDDs. This time around, I wanted to use the best OS ever, Arch Linux, and my favorite filesystem toy, btrfs. I put in a 120 GB ADATA SSD, and in no time at all, my Arch server was up with a basic RAID10 filesystem running on my new drives. Then I started up rsync, and called it a night.

Around 6 TB of data later, the new server just needed a bit of software setup to match the old server's feature set, and it was good to go. I swapped the IPs of the machines on my DHCP server to keep existing static entries working, and after a few days of running the old one to make sure everything was there, I took it down. Since I had a few spare SATA ports on the new server still, I moved two of the 3 TB Seagate HDDs from the old server over to the new one and added them to the btrfs volume, put another one in my desktop PC, Rin, and the fourth drive into one of the enclosures from the 8 TB drives. Finally, plenty of disk space everywhere I need it.

A look at the current filesystem status shows just how wonderfully overkill this is for a home file server:

```
[alan@longhorn ~]$ btrfs filesystem usage /storage -H
Overall:
    Device size:                           38.01TB
    Device allocated:                      12.46TB
    Device unallocated:                    25.54TB
    Device missing:                         8.00TB
    Used:                                  12.44TB
    Free (estimated):                      12.78TB      (min: 12.78TB)
    Data ratio:                               2.00
    Metadata ratio:                           2.00
    Global reserve:                       536.87MB      (used: 0.00B)
```

I still need to go through a few terabytes of data on my desktop PC, and eventually organize it all and move it over to Longhorn, but the result I've got now is something I'm incredibly satisfied with. The new setup leaves Longhorn with 38 terabytes of hard drives, giving a usable 19 terabytes after RAID1 redundancy and the overhead of btrfs's metadata storage.
