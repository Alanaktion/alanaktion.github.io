---
layout: post
title: Too Many Drives
date: 2020-04-14 18:32:00
excerpt: Following up on my last server update, I've got a new case and even more drives for some reason.
---

Following up on my minor [server upgrade](/2019/09/25/home-server/) last year, I've made a few new changes to fix some issues with my general home setup.

One of the worst things about my server has always been the case. When I built it, I bought the cheapest MicroATX case I could find on NewEgg that still had space for a few 3.5" drives. That case only had three drive bays, and I've been running six drives in it, with them basically just stuck anywhere they'd fit. The system drive, a 2.5" SATA SSD, literally rested on the CPU cooler because it was the only place I could fit it.

It was definitely due for an upgrade. I've been eyeing the Fractal Design Node 804 for a while, and finally went for it. It's a fantastic case, with great airflow, loads of drive bays, excellent removable drive cages, and plenty of space to work in. Along with the new case, I moved over my third 12 TB HDD from my main PC, as a dedicated YouTube mirror drive, because I've reached a point where that's a thing a I need for some reason.

With the latest changes, my disks now look like this:

```plaintext
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 111.8G  0 disk
├─sda1   8:1    0   1.9M  0 part
└─sda2   8:2    0 111.8G  0 part /
sdb      8:16   0  10.9T  0 disk
sdc      8:32   0  10.9T  0 disk /storage
sdd      8:48   0   7.3T  0 disk
sde      8:64   0   7.3T  0 disk /archive
sdf      8:80   0  10.9T  0 disk
└─sdf1   8:81   0  10.9T  0 part /youtube
sdg      8:96   0   2.7T  0 disk
└─sdg1   8:97   0   2.7T  0 part /scratch
```

I'm still using btrfs for the RAID1 `/archive` and RAID0 `/storage` volumes. I added the `/scratch` volume with a dedicated disk used as a cache drive, and for heavy random IO that's too big for the SSD (temporary transcoding, compiling Android ROMs, _etc._). It also stores things like thumbnails and metadata for Plex and [Jellyin](https://jellyfin.org/) (which is a great fork of the Emby project).

The newly-added 12 TB drive mounted at `/youtube` is a good sign of my /r/datahoarder tendencies, as I'm already using 65% of its capacity. 3.4 TiB of that is just my Nerd³ archive, which I _think_ has every video publicly listed on every official Nerd³ channel, and the complete UnofficialNerdCubedLive collection.

I still eventually plan to move to a many-disk setup with at least 8×12 TB drives in either RAID10 or a parity setup of some kind, likely on ZFS if I can justify the RAM requirement. I'll probably also move off of Arch Linux as my host OS, maybe even going for something like ESXi. Arch is great, but having to reboot as often as I do for updates when I have a bunch of VMs, containers, and other services running, is somewhat annoying. I'll probably just end up using Debian or something and running everything in Docker containers.

I also really want to upgrade the network card. I'd love at least a 2.5 Gbps connection on it, as my main PC's new motherboard has dual Ethernet with a 2.5 Gbps port. I could even just use a direct connection with a crossover adapter and skip buying a switch for now, since the only device that'd actually sustain > 1 Gbps is my main PC when I'm doing large file transfers. That'll probably be my next upgrade.
