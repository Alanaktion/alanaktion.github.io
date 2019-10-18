---
layout: post
title: Arch on UEFI
date: 2016-07-19 11:46:00
---

UEFI boot is weird, mostly because of backwards compatibility. Here's a simple guide to setting up UEFI on GPT, assuming you already know how to do a [typical Arch install]({% post_url 2016-02-11-arch-setup %}).

## Partitions

Gdisk supports GPT, so we'll use that to partition our system disk.

```bash
gdisk /dev/sda
```

Press `o` to create a new GPT partition table, overwriting any existing contents.

Then, use `n` to create new partitions:

- Root partition (8300), full disk size - 1.5 GB.
- EFI partition (EF00), 1024 MB

Type `p` to output your new partition layout, and `w` to write the changes.

Finally, refresh the disks.

```bash
partprobe
```

## Filesystems

Create filesystems for the new partitions:

```bash
mkfs.ext4 /dev/sda1
mkfs.fat -F32 /dev/sda2
```

Mount the new filesystems

```bash
mount /dev/sda1 /mnt
mkdir /mnt/boot
mount /dev/sda2 /mnt/boot
```

## Bootloader

First, mount `efivarfs` if not already mounted:

```bash
mount -t efivarfs efivarfs /sys/firmware/efi/efivars
```

We'll use `systemd-boot`, as it's included within `systemd`.

```bash
bootctl install
```

We'll need to write a few new config files in /boot/loader:

```bash
vim /boot/loader/loader.conf
```

```
default arch
timeout 3
editor  0
```

```bash
vim /boot/loader/entries/arch.conf
```

```
title   Arch Linux
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options root=/dev/sda1 rw
```

## Finishing Up

```bash
exit # ^D is always superior :P
umount -R /mnt
reboot
```
