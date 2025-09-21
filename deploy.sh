#!/bin/bash

# Portfolio Site One-Click Deployment Script
# Domain: hamedelfayome.dev

set -e

echo "🚀 Starting portfolio site deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Create SSL directory if it doesn't exist
mkdir -p ssl

# Check if SSL certificates exist
if [ ! -f "ssl/fullchain.pem" ] || [ ! -f "ssl/privkey.pem" ]; then
    echo -e "${YELLOW}⚠️  SSL certificates not found in ./ssl/ directory${NC}"
    echo -e "${BLUE}🔒 Generating SSL certificates with Certbot...${NC}"

    # Check if certbot is installed
    if ! command -v certbot &> /dev/null; then
        echo -e "${BLUE}📦 Installing Certbot...${NC}"
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y certbot
        elif command -v yum &> /dev/null; then
            sudo yum install -y certbot
        else
            echo -e "${RED}❌ Cannot install certbot automatically. Please install it manually.${NC}"
            exit 1
        fi
    fi

    # Generate SSL certificate
    echo -e "${BLUE}🔐 Requesting SSL certificate for hamedelfayome.dev...${NC}"
    sudo certbot certonly --standalone \
        --preferred-challenges http \
        -d hamedelfayome.dev \
        -d www.hamedelfayome.dev \
        --non-interactive \
        --agree-tos \
        --email admin@hamedelfayome.dev

    # Copy certificates to ssl directory
    if [ -f "/etc/letsencrypt/live/hamedelfayome.dev/fullchain.pem" ]; then
        sudo cp /etc/letsencrypt/live/hamedelfayome.dev/fullchain.pem ssl/
        sudo cp /etc/letsencrypt/live/hamedelfayome.dev/privkey.pem ssl/
        sudo chown $(whoami):$(whoami) ssl/*.pem
        echo -e "${GREEN}✅ SSL certificates generated successfully!${NC}"
    else
        echo -e "${RED}❌ Failed to generate SSL certificates${NC}"
        read -p "Continue without SSL? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
fi

# Stop any existing containers
echo -e "${BLUE}🛑 Stopping existing containers...${NC}"
docker-compose down 2>/dev/null || true

# Build and start the application
echo -e "${BLUE}🔨 Building Docker image...${NC}"
docker-compose build

echo -e "${BLUE}🌐 Starting portfolio site...${NC}"
docker-compose up -d

# Wait for container to be ready
echo -e "${BLUE}⏳ Waiting for container to be ready...${NC}"
sleep 5

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Portfolio site deployed successfully!${NC}"
    echo ""
    echo -e "${GREEN}🌐 Your site is now available at:${NC}"
    if [ -f "ssl/fullchain.pem" ] && [ -f "ssl/privkey.pem" ]; then
        echo -e "${GREEN}   • https://hamedelfayome.dev${NC}"
        echo -e "${GREEN}   • http://hamedelfayome.dev (redirects to HTTPS)${NC}"
    else
        echo -e "${YELLOW}   • http://localhost (HTTP only - no SSL)${NC}"
    fi
    echo ""
    echo -e "${BLUE}📊 To view logs: docker-compose logs -f${NC}"
    echo -e "${BLUE}🛑 To stop: docker-compose down${NC}"
    echo -e "${BLUE}🔄 To restart: docker-compose restart${NC}"
else
    echo -e "${RED}❌ Deployment failed. Check logs with: docker-compose logs${NC}"
    exit 1
fi