---
layout: post
title: Minimal BitTorrent Seednode
date: 2015-05-04 23:42:12
---

I took the time over the weekend to get more familiar with OpenVPN and Debian 8, which are an awesome combination. My first seednode I set up was on an old laptop. Debian 8's netboot CD gives you everything you need and nothing more, which is perfect, so that's where I started. Once I got the laptop up and running, I tried it out on a VirtualBox VM on my OVH server. Here's the complete guide to doing this yourself:

1. Get Debian 8's [netboot](https://www.debian.org/distrib/netinst) or [live CD](https://www.debian.org/CD/live/) ISO (Get the Standard release, WMs are a waste of resources)
2. Install the OS on a physical machine or VM, optionally enabling full-disk encryption. You'll probably only need 1-2 GB of RAM and a somewhat recent CPU, nothing too fancy. Bigger nodes need faster specs, but BitTorrent isn't very heavy.
3. Once the OS has booted, update everything and install some basic packages:
    1. Log in as `root` using the password you set during installation
    2. `apt-get update`
    3. `apt-get dist-upgrade -y`
    4. `apt-get install openvpn transmission-cli transmission-common transmission-daemon -y`
    5. `reboot`
    6. One your system reboots, log in as `root` again. If you enabled encryption in step 2, you'll need to enter that passphrase again on each reboot.
4. Configure the VPN
    1. Get a paid VPN service, I recommend [Private Internet Access](https://privateinternetaccess.com/). $35/yr, unlimited bandwidth, thousands of gateways around the world.
    2. `cd /etc/openvpn`
    3. Create a new file with `nano client.conf`, entering the contents below. This will be used to auto-connect to your VPN on startup.

        ```
        client
        dev tun
        proto udp

        # Edit the line below with your VPN server's host/port
        remote nl.privateinternetaccess.com 1194

        resolv-retry infinite
        nobind
        persist-key
        persist-tun

        auth-user-pass /etc/openvpn/auth.txt
        ```

    4. Save the file with Ctrl+X, Y, Enter.
    5. Next, we'll give the VPN connection your login credentials. Create a new file with `nano auth.txt` and enter your VPN username and password on separate lines, like this:

        ```
        username
        P@ssw0rd!
        ```

    6. Save the file with Ctrl+X, Y, Enter.
    7. Ensure no other users can access your VPN configuration by running `chmod go-rw *`
5. Set up Transmission
    1. Stop the currently-running transmission with `service transmission-daemon stop`
    2. Open Transmission's configuration file with `nano /etc/transmission-daemon/settings.json`
    3. Using the arrow keys or Ctrl+W, scroll down to the line that says `"rpc-whitelist"`.
    4. If your server is running on your local network, or will always be accessed over a secure internal connection, change the `"127.0.0.1"` on this line to `"*"`, otherwise, replace it with `"YOUR.IP"` (where YOUR.IP is your external IP address).
    6. Optionally, you can also add lines for loading new .torrent files, etc. See the [official documentation](https://trac.transmissionbt.com/wiki/EditConfigFiles) for the complete list of possible options.
    5. Save the file with Ctrl+X, Y, Enter.
6. Reboot the server again (`reboot`).
7. Log in as root again, and run `ifconfig`. You should see a `tun0` line, this is your VPN connection.
8. Install the [Transmission Remote GUI](https://code.google.com/p/transmisson-remote-gui/downloads/list) or use `transmission-cli` to access your server.
    - The Transmission Remote GUI link will likely stop working soon, as Google Code is shutting down. I'm not yet aware of an official repo elsewhere yet, so I created my own. See [my clone on Github](https://github.com/Alanaktion/transmisson-remote-gui/releases/tag/5.0.1) if the official link doesn't work.

Feel free to message me on [Twitter](https://twitter.com/alanaktion) or [Gitter](https://gitter.im/Alanaktion) if you have ideas for how to improve this setup. It seems to work well so far, and the minimalist approach is something I absolutely love.
