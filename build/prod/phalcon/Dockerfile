FROM mileschou/phalcon:7.2-alpine as phalcon

RUN mv "$(php-config --extension-dir)/phalcon.so" /

############################################################

FROM php:7.2-fpm-alpine

COPY --from=phalcon /phalcon.so /phalcon.so
RUN mv /phalcon.so "$(php-config --extension-dir)/" \
    && docker-php-ext-enable "$(php-config --extension-dir)/phalcon.so"

COPY ./build/prod/phalcon/www.conf /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www
