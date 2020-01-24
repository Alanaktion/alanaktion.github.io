---
layout: post
title: Wireguard
date: 2020-01-23 19:18:00
---

I've always had various ways of connecting to my local network externally, from unencrypted VNC connections directly to my PC in the early days, to RDP, SSH tunnels, and eventually proper VPN setups.

Most recently, I was using SoftEther on my file server as my way into my local network, which is nice because it bundles support for most of the modern protocols out of the box, but is a bit of a pain to keep running correctly on Arch, and seems overkill for what I was doing. Not to mention having like 10 ports open for an occasional single VPN connection felt really silly.

Now though, I'm using [WireGuard](https://www.wireguard.com), and it is a much better experience. With native support in the Linux kernel, it "just works" out of the box on the client and server ends (both just peers in WireGuard's implementation), and is really clean to set up and maintain. It only uses a single UDP port for incoming traffic, and works much better with my slightly weird networking setup.

Like basically everything on linux, the [Arch Wiki article](https://wiki.archlinux.org/index.php/WireGuard) on WireGuard is fantastic and has basically everything you could need to set it up.

## Server configuration

My "server" configuration at `/etc/wireguard/wg0.conf`:

```ini
[Interface]
Address = 10.200.200.1/24
ListenPort = 51820
PrivateKey = [key here]

PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o enp1s0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o enp1s0 -j MASQUERADE

[Peer]
PublicKey = [key here]
PresharedKey = [psk here]
AllowedIps = 10.200.200.2/32

[Peer]
PublicKey = [key here]
PresharedKey = [psk here]
AllowedIps = 10.200.200.3/32
```

The Interface address should be a new subnet that is only used for assigning addresses to the WireGuard peers themselves. The `PostUp` and `PostDown` settings are used to update `iptables` to forward IP traffic from the peers through your primary network interface. Replace `enp1s0` with whatever your interface name is (you can use `ip link` to list them).

If it's behind a firewall, you'll need to add a NAT rule allowing UDP traffic to your server on the `ListenPort` you defined.

You can generate a private key with `wg genkey`, and generate a pre-shared key to give the clients with `wg genpsk`.

The `Peer` sections here are the "clients" in the network. You'll want to generate a PSK to add here and to the peer when configuring it, then let the peer generate its own key pair to add to the server's config. Each peer should either have a unique address or use a `/24` subnet to allow it to be dynamically assigned an IP when it connects.

One configured, you can use `wg-quick up wg0` directly to start your server, or manage it as a systemd service:

```bash
systemctl start wg-quick@wg0.service
```

## Client configuration

When adding a client peer, it works best to let the client generate its own key pair and just add its public key as a new peer. A client's config should look something like this:

```ini
[Interface]
Address = 10.200.200.2/24
PrivateKey = [auto-generated private key here]
DNS = 1.1.1.1

[Peer]
PublicKey = [server public key here]
PresharedKey = [psk here]
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = wireguard.example.net:51820
```

The `Address` should be compatible with the `AllowedIps` setting for that peer in the server's configuration, and the `Endpoint` should be the hostname and port of your server. The `DNS` can be set to any DNS server that's accessible once your connected. If you're not forwarding traffic on the server end, this will need to be a DNS server in the WireGuard subnet if you want name resolution to work.
