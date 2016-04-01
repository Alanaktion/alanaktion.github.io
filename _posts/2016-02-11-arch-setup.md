---
layout: post
title: Arch Setup
date: 2016-02-11 10:11:00
---

I've always loved the concept of Arch Linux, with it's nothing-by-default setup and intentional lack of user-friendly tools, but I've run into issues with the installation that've prevented me from really using it enough to get familiar with it.

This time around I got it working perfectly, so I decided I'd write a little guide on what I did. This is mostly just a reference for me, but it should prove useful to anyone trying out Arch for the first time. This guide assumes familiarity with linux basics, like `sudo`, `fstab`, `gparted`, and you should probably read Arch's [Beginner's Guide](https://wiki.archlinux.org/index.php/Beginners%27_guide).

## Getting Started

Start by booting the [live CD](https://www.archlinux.org/download/).

### Partition setup

*Note: this guide only covers the setup for a MBR partition table as booting GPT requires more system-specific setup.*

If you prefer a more graphical tool you can use the [Gparted live CD](gparted.org/download.php) to configure your partitions, then skip to the "Install base system" step. Note that the current version of the Gparted live CD won't boot properly on VirtualBox without EFI enabled.

Locate the disk you want to install your system to with `lsblk`, then start `cfdisk` with that device.

```bash
cfdisk /dev/sda
```

In `cfdisk`, create a new partition table, then the partitions you would like, writing the changes when you're finished.

Next, create a filesystem, substituting your new system partition and repeating for each partition you need to format.

```bash
mkfs.ext4 /dev/sda1
```

If a swap partition was created, activate it:

```bash
mkswap /dev/sda2
swapon /dev/sda2
```

## Install base system

### Mount partition

Start the installation by mounting your system partition, and any other non-swap partitions you created in `/mnt`.

``` bash
mkdir -p /mnt
mount /dev/sda1 /mnt
```

### Set up base packages and fstab

Move your preferred mirror to the top of the list:

```bash
vim /etc/pacman.d/mirrorlist
```

Install base packages and generate new fstab:

```bash
pacstrap -i /mnt base
genfstab -U -p /mnt >> /mnt/etc/fstab
```

Chroot into the new installation:

```bash
arch-chroot /mnt
```

### Configure language

```bash
sed -i "s/#en_US.UTF-8/en_US.UTF-8/g" /etc/locale.gen
echo LANG=en_US.UTF-8 > /etc/locale.conf
. /etc/locale.conf
locale-gen
```

### Configure timezone

```bash
ln -s /usr/share/zoneinfo/America/Denver /etc/localtime
hwclock --systohc --utc
```

### Configure network

Run `ip link` to list all network interfaces and enable DHCP on the one you want to use:

```bash
ip link
systemctl enable dhcpcd@eth0
```

#### Configure wireless (optional)

```bash
pacman -S wireless_tools wpa_supplicant wpa_actiond dialog
wifi-menu
systemctl enable net-auto-wireless
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
systemctl enable lightdm # Enable lightdm
```

#### Gnome

```bash
pacman -S gnome # Install desktops
systemctl enable gdm # Enable gdm
```

#### KDE Plasma 5

```bash
pacman -S plasma kde-applications
systemctl enable sddm
```

***

After installing your preferred DE, reboot, and your system should be ready to go! If you decide to switch DEs, make sure you disable the display manager before uninstalling, otherwise you'll have to manually remove the symlink from /etc/systemd.

If you're running Arch in VirtualBox, you'll want to install the guest additions with `pacman -S virtualbox-guest-utils`.

For a basic overview of the `pacman` and the Arch User Repositories, see the [Arch wiki](https://wiki.archlinux.org/	) and [this gist](https://gist.github.com/Alanaktion/03d7c0f12c5378ba269f).
