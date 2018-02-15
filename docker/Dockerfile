FROM nginx:alpine

# Default to UTF-8 file.encoding
ENV LANG C.UTF-8

EXPOSE 8080

COPY assets/images/* /usr/share/nginx/html/assets/images/
COPY dist/* /usr/share/nginx/html/
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /webserver
