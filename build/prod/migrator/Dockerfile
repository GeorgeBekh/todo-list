FROM mileschou/phalcon:7.2-alpine

RUN apk --no-cache add postgresql-dev \
    && docker-php-ext-install pdo_pgsql

RUN docker-phalcon-install-devtools
