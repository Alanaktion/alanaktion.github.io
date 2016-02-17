---
layout: post
title: Arch Setup
date: 2016-02-11 10:11:00
---

I've always loved the concept of Arch Linux, with it's nothing-by-default setup and intentional lack of user-friendly tools, but I've run into issues with the installation that've prevented me from really using it enough to get familiar with it.

This time around I got it working perfectly, so I decided I'd write a little guide on what I did. This is mostly just a reference for me, but it should prove useful to anyone trying out Arch for the first time. This guide assumes familiarity with linux basics, like `sudo`, `fstab`, `gparted`, and you should probably read Arch's [Beginner's Guide](https://wiki.archlinux.org/index.php/Beginners%27_guide).

## Getting Started

### Partition setup

I've always found graphical tools much easier to use when working with disk partitions on linux, so I used the [Gparted live CD](gparted.org/download.php) to configure my partitions. I used a `msdos` partition table with a single data partition, plus a 2 GB swap partition at the end of the disk. What you use is up to you, but this guide assumes a single partition with an `msdos` table. Note that the current version of the Gparted live CD won't boot properly on VirtualBox without EFI enabled.

### Start installation

Just boot the [live CD](https://www.archlinux.org/download/)! :P

## Install base system

### Mount partition

Once you're in the live CD, start by mounting your data partition, and any other partitions you created in `/mnt`.

``` bash
mkdir -p /mnt
mount /dev/sda1 /mnt
```

### Set up base packages and fstab

Edit `/etc/pacman.d/mirrorlist`, moving your preferred mirror to the top of the list.

```bash
pacstrap -i /mnt base
genfstab -U -p /mnt >> /mnt/etc/fstab # Generate new /etc/fstab
```

After the `genfstab` run, you can edit your `/mnt/etc/fstab` file to add a swap line, etc.

```bash
arch-chroot /mnt
```

### Configure language

```bash
sed -i "s/#en_US.UTF-8/en_US.UTF-8/g" /etc/locale.gen
echo LANG=en_US.UTF-8 > /etc/locale.conf
export LANG=en_US.UTF-8
locale-gen
```

### Configure timezone

```bash
ln -s /usr/share/zoneinfo/America/Denver /etc/localtime
hwclock --systohc --utc
```

### Configure network

```bash
systemctl enable dhcpcd@eth0.service
```

If `eth0` is not your interface, run `ip link` to list all interfaces.

#### Configure wireless (optional)

```
pacman -S wireless_tools wpa_supplicant wpa_actiond dialog
wifi-menu
systemctl enable net-auto-wireless.service
```

### Configure package manager

Open `/etc/pacman.conf` and check that the `[core]`, `[extra]`, and `[community]` lines are uncommented. If you're on a 64-bit system (you should be), optionally uncomment the `[multilib]` lines for 32-bit compatibility.

After updating your pacman config, refresh the repository list:

```bash
pacman -Sy
```

### Create a user

```bash
passwd # Set root password
useradd -m -g users -G wheel,storage,power -s /bin/bash alan # Create 'alan'
passwd alan # Set password for alan
```

#### Configure sudo

```bash
pacman -S sudo # Install sudo
```

Uncomment the `%wheel` line to allow your new user to use sudo:

```bash
EDITOR=nano visudo
```

### Install bootloader

```bash
pacman -S grub-bios
grub-install --target=i386-pc --recheck /dev/sda
cp /usr/share/locale/en\@quot/LC_MESSAGES/grub.mo /boot/grub/locale/en.mo
grub-mkconfig -o /boot/grub/grub.cfg
```

### Finish installation

```bash
exit
umount /mnt
reboot
```

## Desktop setup

### X.org

```bash
# Xorg
pacman -S xorg-server xorg-xinit xorg-server-utils \
  xorg-twm xorg-xclock xterm

# Mesa (3D acceleration)
pacman -S mesa

# Drivers (only one needed)
pacman -S xf86-video-vesa # Vesa (general, works almost always)
pacman -S nvidia lib32-nvidia-utils # Nvidia
```

### Desktop environment

#### Xfce4 + lightdm

```bash
pacman -S xfce4 xfce4-goodies lightdm lightdm-gtk-greeter
sudo systemctl enable lightdm.service # Enable lightdm
```

#### Gnome

```bash
pacman -S gnome # Install desktop
sudo systemctl enable gdm.service # Enable gdm
```

***

After installing your preferred DE, reboot, and your system should be ready to go!

For a basic overview of the `pacman` and the Arch User Repositories, see the Arch wiki and [this gist](https://gist.github.com/Alanaktion/03d7c0f12c5378ba269f).
