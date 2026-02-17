# SPDX-PackageName: finnix-tracker
# SPDX-PackageSupplier: Ryan Finnie <ryan@finnie.org>
# SPDX-PackageDownloadLocation: https://github.com/finnix/finnix-tracker
# SPDX-FileCopyrightText: © 2025 Ryan Finnie <ryan@finnie.org>
# SPDX-License-Identifier: MPL-2.0

FROM node:alpine

COPY . /tmp/build
RUN npm install --global --production --install-links /tmp/build && rm -rf /tmp/build

EXPOSE 8000/tcp

USER nobody
CMD ["finnix-tracker"]
