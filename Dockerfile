# SPDX-PackageSummary: finnix-tracker
# SPDX-FileCopyrightText: Copyright (C) 2025 Ryan Finnie
# SPDX-License-Identifier: MPL-2.0

FROM node:alpine

COPY . /tmp/build
RUN npm install --global --production --install-links /tmp/build && rm -rf /tmp/build

EXPOSE 8000/tcp

USER nobody
CMD ["finnix-tracker"]
