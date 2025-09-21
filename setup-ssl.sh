#!/bin/bash

# SSL Setup Script for hamedelfayome.dev
# Configures Let's Encrypt SSL certificates

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="hamedelfayome.dev"
EMAIL="hamedelfayome@gmail.com"

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    print_error "Certbot is not installed. Installing..."
    
    # Install certbot based on OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y certbot
        elif command -v yum &> /dev/null; then
            sudo yum install -y certbot
        else
            print_error "Please install certbot manually for your Linux distribution"
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install certbot
        else
            print_error "Please install Homebrew first, then run: brew install certbot"
            exit 1
        fi
    else
        print_error "Unsupported OS. Please install certbot manually."
        exit 1
    fi
fi

print_success "Certbot is available"

# Create SSL directory
mkdir -p ssl

# Stop the container temporarily
print_status "Stopping portfolio container for SSL setup..."
docker-compose down

# Get SSL certificate
print_status "Requesting SSL certificate for $DOMAIN..."
sudo certbot certonly \
    --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --domains $DOMAIN,www.$DOMAIN \
    --cert-name $DOMAIN

# Copy certificates to ssl directory
print_status "Copying certificates..."
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/
sudo chown $USER:$USER ssl/*.pem

# Update nginx.conf to use SSL certificates
print_status "Updating nginx configuration for SSL..."
sed -i.bak 's|# ssl_certificate|ssl_certificate|g' nginx.conf
sed -i.bak 's|# ssl_certificate_key|ssl_certificate_key|g' nginx.conf

# Update docker-compose.yml to mount SSL certificates
print_status "Updating docker-compose configuration..."
sed -i.bak 's|# - ./ssl:/etc/nginx/ssl:ro|- ./ssl:/etc/nginx/ssl:ro|g' docker-compose.yml

# Rebuild and start container with SSL
print_status "Rebuilding container with SSL support..."
docker-compose build
docker-compose up -d

# Wait for container to be ready
sleep 10

# Test SSL
print_status "Testing SSL configuration..."
if curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN | grep -q "200"; then
    print_success "SSL is working correctly!"
else
    print_warning "SSL test failed. Check the configuration."
fi

print_success "SSL setup completed! 🎉"
print_status "Your portfolio is now available at: https://$DOMAIN"

# Setup auto-renewal
print_status "Setting up automatic certificate renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --post-hook 'docker-compose restart'") | crontab -

print_success "Automatic renewal configured!"
print_status "Certificate will be automatically renewed before expiration."
