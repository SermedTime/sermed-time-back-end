FROM node:lts-bookworm

RUN apt-get update && apt-get install -y \
    libaio1 \
    unzip \
    curl \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://download.oracle.com/otn_software/linux/instantclient/1921000/instantclient-basic-linux.x64-19.21.0.0.0dbru.zip \
    -o /tmp/instantclient-19.21.0.0.0dbru.zip -p && unzip /tmp/instantclient-19.21.0.0.0dbru.zip -d /opt/oracle 

WORKDIR /usr/app

ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_19_21:$LD_LIBRARY_PATH

ENV ORACLEHOME=/opt/oracle/instantclient_19_21

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "tail", "-f", "/dev/null" ]