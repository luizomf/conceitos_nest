```
!!! ATENÇÃO !!!
LEMBRETE package-lock.json

# DOMÍNIO

# SERVIDOR
sudo apt update -y
sudo apt upgrade -y

sudo apt install git curl
sudo apt install postgresql


# POSTGRESQL
sudo -u postgres psql

create user USUARIO with encrypted password 'SENHA';
CREATE DATABASE NOMEDABASE WITH OWNER USUARIO;
GRANT ALL PRIVILEGES ON DATABASE NOMEDABASE TO USUARIO;

sudo systemctl restart postgresql


# NODE
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

!!! ATENÇÃO !!!
LEMBRETE package-lock.json


# BAIXAR O CÓDIGO DO GITHUB
git clone ENDERECO_GITHUN_SSH


# .env
DATABASE_TYPE='postgres'
DATABASE_HOST='localhost'
DATABASE_PORT=5432
DATABASE_USERNAME='nestjs'
DATABASE_DATABASE='nestjs'
DATABASE_PASSWORD='nestjs'
DATABASE_AUTOLOADENTITIES=1
DATABASE_SYNCHRONIZE=1

JWT_SECRET=1d13afba3b3835d8e7a475803cf75f3f9ff9907d6b3ff29f2b4f27037cae2f2f0e760ea2797ed3fa2b15af9f1cd5f1f20d2be6c98370bd2fc130955660e1095ce790013ceefa49e47c3c5816214f02e494fe1472f1a378866272767f63b503d72365081a7a626ccc85a9cf04447a0785cfb48a35583ebb10b50e02c0e68b5932a871538247f3ae889911949126a3813ac416d46c63869098fa4438fba3e59aed90e947659d0edc2adcc64dac1dad4f2c303352153c9eab11abc9d68b077ab7aadf5c5aa11cbecd87482f6043a071842aebd92898506e15b404464832426ead2fceb3f13a1362d641b693d8e267db51972f7ac36cb241a3014a6d77c73ff26250
JWT_TOKEN_AUDIENCE=http://localhost:3000
JWT_TOKEN_ISSUER=http://localhost:3000
JWT_TTL=3600
JWT_REFRESH_TTL=86400

APP_PORT=3000
NODE_ENV='production'

!!! ATENÇÃO !!!
MUDAR .ENV
DATABASE_SYNCHRONIZE=0


# BUILD
npm run build


# LETSENCRYPT
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
sudo apt-get install certbot
sudo service nginx stop
sudo certbot certonly --standalone -d SEU_DOMINIO
sudo service nginx start




# NGINX
sudo apt install nginx
sudo nano /etc/nginx/sites-available/nestjs.otaviomiranda.com.br


# Redireciona para HTTPS
server {
	listen 80;
	listen [::]:80;
  server_name nestjs.otaviomiranda.com.br;
  return 301 https://$host$request_uri;
}

# HTTPS
server {
	listen 443 ssl http2;
	listen [::]:443 ssl http2;

	server_name nestjs.otaviomiranda.com.br;

	# O servidor só vai responder pra este domínio
  if ($host != "nestjs.otaviomiranda.com.br") {
    return 404;
  }

	ssl_certificate /etc/letsencrypt/live/nestjs.otaviomiranda.com.br/fullchain.pem; # managed by Certbot
	ssl_certificate_key /etc/letsencrypt/live/nestjs.otaviomiranda.com.br/privkey.pem; # managed by Certbot
	ssl_trusted_certificate /etc/letsencrypt/live/nestjs.otaviomiranda.com.br/chain.pem;

	# Improve HTTPS performance with session resumption
	ssl_session_cache shared:SSL:10m;
	ssl_session_timeout 5m;

	# Enable server-side protection against BEAST attacks
	ssl_prefer_server_ciphers on;
	ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;

	# Disable SSLv3
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

	# Diffie-Hellman parameter for DHE ciphersuites
	# $ sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096
	ssl_dhparam /etc/ssl/certs/dhparam.pem;

	# Enable HSTS (https://developer.mozilla.org/en-US/docs/Security/HTTP_Strict_Transport_Security)
	add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";

	# Enable OCSP stapling (http://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox)
	ssl_stapling on;
	ssl_stapling_verify on;
	resolver 8.8.8.8 8.8.4.4 valid=300s;
	resolver_timeout 5s;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html index.php;

	location / {
		proxy_pass http://localhost:3000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}

	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	location ~ /\.ht {
		deny all;
	}

	location ~ /\. {
		access_log off;
		log_not_found off;
		deny all;
	}

	gzip on;
	gzip_disable "msie6";

	gzip_comp_level 6;
	gzip_min_length 1100;
	gzip_buffers 4 32k;
	gzip_proxied any;
	gzip_types
		text/plain
		text/css
		text/js
		text/xml
		text/javascript
		application/javascript
		application/x-javascript
		application/json
		application/xml
		application/rss+xml
		image/svg+xml;

	access_log off;
	#access_log  /var/log/nginx/nestjs.otaviomiranda.com.br-access.log;
	error_log   /var/log/nginx/nestjs.otaviomiranda.com.br-error.log;

	#include /etc/nginx/common/protect.conf;
}


sudo ln /etc/nginx/sites-available/nestjs.otaviomiranda.com.br /etc/nginx/sites-enabled/nestjs.otaviomiranda.com.br
sudo systemctl  restart nginx



# PM2
npm i -g pm2
pm2 start server.js --name nestjs
pm2 startup
pm2 save


# NGINX UPLOAD
sudo nano /etc/nginx/nginx.conf

        client_max_body_size 5M;

sudo systemctl restart nginx
```
