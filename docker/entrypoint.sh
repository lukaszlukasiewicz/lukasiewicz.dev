#!/bin/sh
set -e

# Generate self-signed SSL certificates if they don't exist
if [ ! -f /etc/nginx/ssl/cert.pem ] || [ ! -f /etc/nginx/ssl/key.pem ]; then
    echo "Generating self-signed SSL certificates..."
    mkdir -p /etc/nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/key.pem \
        -out /etc/nginx/ssl/cert.pem \
        -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost" \
        -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1"
    echo "Self-signed certificates generated."
    echo "WARNING: For production use, replace with certificates from a trusted CA (e.g., Let's Encrypt)."
fi

# Start supervisor to manage nginx and nextjs
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
