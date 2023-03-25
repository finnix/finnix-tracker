# Finnix BitTorrent tracker

This is the tracker used for Finnix's BitTorrent tracker.

## Configuration

The list of approved hashes is baked into the primary script.
This reduces complexity, but does mean the repo needs to be updated and a new container needs to be built for each release.

## Usage

```
docker run --rm --init -p 127.0.0.1:23812:8000/tcp ghcr.io/finnix/finnix-tracker:latest
```

Example Apache configuration:

```
<VirtualHost *:443>
  ServerName tracker.finnix.org
  ServerAlias ipv6.tracker.finnix.org
  SSLEngine on

  RewriteEngine on
  RewriteRule ^/$ /stats [PT,L]
  RewriteRule ^/favicon.ico$ - [R=404,L]

  ProxyPass / http://127.0.0.1:23812/
  ProxyPassReverse / http://127.0.0.1:23812/
  # bittorrent-tracker blindly trusts X-Forwarded-For, so we must strip before setting
  RequestHeader unset X-Forwarded-For
</VirtualHost>
```

Note that while they both proxy to the same destination, `tracker.finnix.org` only has A records and `ipv6.tracker.finnix.org` only has AAAA records.
Both are listed as trackers in the torrents.
If this weren't done and `tracker.finnix.org` was both A and AAAA, a dual-stack client might default to announcing to the tracker over IPv6 and only get back IPv6 peers (potentially with many fewer options). By listing two trackers, the dual-stack client will announce over both IPv4 and IPv6.