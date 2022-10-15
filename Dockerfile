FROM nginx:1.23-alpine

EXPOSE 80

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist/law-office-assistant /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html

#USER nginx
