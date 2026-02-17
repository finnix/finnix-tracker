# Finnix BitTorrent tracker

This is the tracker used for Finnix's BitTorrent tracker.

## Configuration

The list of approved hashes is baked into the primary script.
This reduces complexity, but does mean the repo needs to be updated and a new container needs to be built for each release.

## Usage

```
docker run --rm --init -p 127.0.0.1:23812:8000/tcp ghcr.io/finnix/finnix-tracker:main
```

Example nginx configuration:

```
server {
    server_name tracker.finnix.org ipv6.tracker.finnix.org;
    ssl_certificate /etc/letsencrypt/live/tracker.finnix.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/tracker.finnix.org/privkey.pem; # managed by Certbot
    add_header Strict-Transport-Security "max-age=15768000" always;

    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    listen 80;
    listen [::]:80;
    listen 6969;
    listen [::]:6969;

    if ($https != "on") {
        return 301 https://$host$request_uri;
    }

    rewrite ^/$ /stats;
    location ~ ^/favicon.ico$ {
        return 404;
    }
    location / {
        proxy_pass http://127.0.0.1:23812;
        proxy_set_header Host $host;
        proxy_redirect http:// https://;
        proxy_http_version 1.1;

        # bittorrent-tracker blindly trusts X-Forwarded-For, so we must not append
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Explicitly do not set these on the proxy
        #proxy_set_header Upgrade $http_upgrade;
        #proxy_set_header Connection $connection_upgrade;
    }
}
```

Note that while they both proxy to the same destination, `tracker.finnix.org` only has A records and `ipv6.tracker.finnix.org` only has AAAA records.
Both are listed as trackers in the torrents.
If this weren't done and `tracker.finnix.org` was both A and AAAA, a dual-stack client might default to announcing to the tracker over IPv6 and only get back IPv6 peers (potentially with many fewer options). By listing two trackers, the dual-stack client will announce over both IPv4 and IPv6.

## License

This document is provided under the following license:

    SPDX-PackageName: finnix-tracker
    SPDX-PackageSupplier: Ryan Finnie <ryan@finnie.org>
    SPDX-PackageDownloadLocation: https://github.com/finnix/finnix-tracker
    SPDX-FileCopyrightText: © 2025 Ryan Finnie <ryan@finnie.org>
    SPDX-License-Identifier: CC-BY-SA-4.0
