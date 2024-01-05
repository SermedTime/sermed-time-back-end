FROM node:20.10-slim

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]