FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY ./* /var/www/html/
EXPOSE 8083
CMD ["nginx","-g","daemon off;"]

