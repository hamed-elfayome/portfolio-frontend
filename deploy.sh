#!/bin/bash

# Portfolio Deployment Script
# One-click deployment for hamedelfayome.dev

set -e

echo "🚀 Starting Portfolio Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="hamedelfayome.dev"
CONTAINER_NAME="hamed-elfayome-portfolio"
IMAGE_NAME="hamed-elfayome-portfolio"

# Function to print colored output
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

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Docker and Docker Compose are available"

# Stop and remove existing container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    print_status "Stopping existing container..."
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
    print_success "Existing container removed"
fi

# Remove existing image if it exists
if [ "$(docker images -q $IMAGE_NAME)" ]; then
    print_status "Removing existing image..."
    docker rmi $IMAGE_NAME || true
    print_success "Existing image removed"
fi

# Build the Docker image
print_status "Building Docker image..."
docker-compose build --no-cache

# Start the container
print_status "Starting portfolio container..."
docker-compose up -d

# Wait for container to be ready
print_status "Waiting for container to be ready..."
sleep 10

# Check if container is running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    print_success "Portfolio is running successfully!"
    
    # Display container information
    echo ""
    print_status "Container Information:"
    docker ps -f name=$CONTAINER_NAME --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    echo ""
    print_status "Portfolio URLs:"
    echo "  🌐 HTTP:  http://$DOMAIN"
    echo "  🔒 HTTPS: https://$DOMAIN"
    echo "  🏥 Health: http://$DOMAIN/health"
    
    echo ""
    print_status "Useful Commands:"
    echo "  📊 View logs:    docker-compose logs -f"
    echo "  🛑 Stop:         docker-compose down"
    echo "  🔄 Restart:      docker-compose restart"
    echo "  📋 Status:       docker-compose ps"
    
    echo ""
    print_warning "Note: SSL certificates need to be configured for HTTPS"
    print_warning "Run: ./setup-ssl.sh to configure Let's Encrypt SSL"
    
else
    print_error "Failed to start container. Check logs with: docker-compose logs"
    exit 1
fi

print_success "Deployment completed! 🎉"
