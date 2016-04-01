---
layout: post
title: Bridged Networking on Ubuntu 14.04
date: 2015-07-02 14:58:16
---
It's often necessary to set up a bridged network on VM hosts, but the documntation for Ubuntu has gotten a bit dated. After much trial-and-error, here is what worked for my datacenter-hosted VM server:

First, run `sudo apt-get install bridge-utils`, if the package is not already installed.

Next, update your `/etc/network/interfaces` file to include a `br0` adapter, moving any ip configuration from `eth0`. This is the complete configuration that I'm running:

```
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet manual

auto br0
iface br0 inet static
    address 192.99.15.40
    netmask 255.255.255.0
    network 192.99.15.0
    broadcast 192.99.15.255
    gateway 192.99.15.254
    bridge_ports eth0
    bridge_stp off
    bridge_fd 0
    bridge_maxwait 0
```

You can also safely add an `iface eth0 inet6` section for IPv6 networking, without it interfering with the bridged adapter configuration.

Finally, restart your networking services, in a different way than usual. Since your primary interface is now `br0`, you'll want to run `sudo ifdown eth0 && sudo ifup br0`. Assuming your configuration was done correctly, this shouldn't interrupt any open SSH connections. Once your `br0` interface is up, you can proceed to bind IPs to it within VMs by pointing the VM to your `br0` device as a bridged adapter. Static IP assignments within VMs should work fine as long as the IP is associated with your host machine.

This setup should work on any debian-based OS, and may work on other linux-based OSes as well. I'll likely replace my Ubuntu host with a Debian 8 setup soon, and I'll update this post when I do.

*Partially sourced from the [KVM/Networking](https://help.ubuntu.com/community/KVM/Networking) article on Ubuntu's community site.*
