#!/bin/bash

# Fix nginx configuration issues
# Fixes duplicate location blocks and deprecated http2 directive

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

print_status "🔧 Fixing nginx configuration issues..."

# Stop the container
print_status "Stopping container..."
docker-compose down

# Rebuild with fixed nginx config
print_status "Rebuilding container with fixed nginx configuration..."
docker-compose build --no-cache

# Start the container
print_status "Starting container..."
docker-compose up -d

# Wait for container to start
print_status "Waiting for container to start..."
sleep 10

# Test nginx configuration
print_status "Testing nginx configuration..."
if docker exec hamed-elfayome-portfolio nginx -t; then
    print_success "Nginx configuration is now valid!"
else
    print_error "Nginx configuration still has errors:"
    docker exec hamed-elfayome-portfolio nginx -t
    exit 1
fi

# Check if container is running properly
print_status "Checking container status..."
if docker ps | grep -q "hamed-elfayome-portfolio.*Up"; then
    print_success "Container is running properly!"
else
    print_error "Container is not running properly. Checking logs..."
    docker-compose logs --tail=20
    exit 1
fi

# Test local connectivity
print_status "Testing local connectivity..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200\|301\|302"; then
    print_success "Local HTTP connection works!"
else
    print_warning "Local HTTP connection failed. Checking logs..."
    docker-compose logs --tail=10
fi

print_success "Nginx configuration fixed! 🎉"
print_status "Your portfolio should now be accessible at:"
echo "  🌐 HTTP:  http://hamedelfayome.dev"
echo "  🔒 HTTPS: https://hamedelfayome.dev"

print_status "Container status:"
docker-compose ps
