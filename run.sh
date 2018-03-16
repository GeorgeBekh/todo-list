#! /bin/env bash

COMPOSER_PARAM=""
NODE_PARAM="dev"

if [[ $1 = "-p" ]]; then
    export APP_IP=0.0.0.0
    COMPOSER_PARAM="--no-dev"
    NODE_PARAM="build"
fi

(cd src && ../bin/composer install $COMPOSER_PARAM) &
(cd frontend && ../bin/node npm run $NODE_PARAM) &

export APP_SECRET=${APP_SECRET:-$(head -c 50 /dev/urandom | base64)}

docker-compose build
docker-compose up -d
