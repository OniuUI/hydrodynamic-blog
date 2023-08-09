#!/bin/bash

# Define domain and project directory
DOMAIN="blog.hydrodynamic.no"
PROJECT_DIR="$HOME/hydrodynamic-blog"

# Use Certbot to obtain/renew the certificate
certbot certonly --webroot -w /var/www/html -d $DOMAIN --agree-tos --no-eff-email --keep

# Check Certbot exit status
if [ $? -ne 0 ]; then
    echo "Certbot command failed. Exiting."
    exit 1
fi

# Copy the certificates to the project directory
mkdir -p $PROJECT_DIR/certs
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $PROJECT_DIR/certs/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $PROJECT_DIR/certs/

# Change permissions if needed (making sure your user can access them)
sudo chown $USER:$USER $PROJECT_DIR/certs/*

echo "Certificates updated successfully."
