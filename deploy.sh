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
    echo -e "${BLUE}📋 Please ensure you have:${NC}"
    echo "   - ssl/fullchain.pem"
    echo "   - ssl/privkey.pem"
    echo ""
    echo -e "${BLUE}💡 You can obtain SSL certificates from:${NC}"
    echo "   - Let's Encrypt (certbot)"
    echo "   - Cloudflare Origin Certificates"
    echo "   - Your domain registrar"
    echo ""
    read -p "Do you want to continue without SSL? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ Deployment cancelled. Please add SSL certificates and try again.${NC}"
        exit 1
    fi
    echo -e "${YELLOW}⚠️  Continuing without SSL - site will only work on HTTP${NC}"
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