FROM node:alpine

COPY . /srv/finnix-tracker
RUN cd /srv/finnix-tracker && npm install --production

EXPOSE 8000/tcp

USER nobody
CMD ["/srv/finnix-tracker/finnix-tracker.js"]
