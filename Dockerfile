# SPDX-PackageSummary: finnix-tracker
# SPDX-FileCopyrightText: Copyright (C) 2025 Ryan Finnie
# SPDX-License-Identifier: MPL-2.0

FROM node:alpine

COPY . /srv/finnix-tracker
RUN cd /srv/finnix-tracker && npm install --production

EXPOSE 8000/tcp

USER nobody
CMD ["/srv/finnix-tracker/finnix-tracker.js"]
