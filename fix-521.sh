#!/bin/bash

# Quick fix script for Cloudflare Error 521
# Web server is down - Cloudflare can't connect to origin

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

print_status "🔧 Applying quick fixes for Cloudflare Error 521..."

# Fix 1: Restart the container
print_status "1. Restarting container..."
docker-compose down
sleep 2
docker-compose up -d
sleep 5

# Fix 2: Check and fix nginx configuration
print_status "2. Checking nginx configuration..."
if docker exec hamed-elfayome-portfolio nginx -t; then
    print_success "Nginx config is valid"
    docker exec hamed-elfayome-portfolio nginx -s reload
else
    print_error "Nginx config has errors, restarting nginx..."
    docker exec hamed-elfayome-portfolio nginx -s stop || true
    docker exec hamed-elfayome-portfolio nginx
fi

# Fix 3: Ensure SSL certificates are properly mounted
print_status "3. Checking SSL certificate mounting..."
if [ -f "ssl/fullchain.pem" ] && [ -f "ssl/privkey.pem" ]; then
    print_success "SSL certificates exist locally"
    
    # Check if certificates are accessible inside container
    if docker exec hamed-elfayome-portfolio test -f /etc/nginx/ssl/fullchain.pem; then
        print_success "SSL certificates are mounted in container"
    else
        print_warning "SSL certificates not mounted, restarting with volume mount..."
        docker-compose down
        docker-compose up -d
    fi
else
    print_error "SSL certificates missing! Run ./setup-ssl.sh first"
    exit 1
fi

# Fix 4: Check if ports are properly exposed
print_status "4. Checking port exposure..."
if netstat -tlnp | grep -q ":80 " && netstat -tlnp | grep -q ":443 "; then
    print_success "Ports 80 and 443 are exposed"
else
    print_warning "Ports not properly exposed, restarting container..."
    docker-compose down
    docker-compose up -d
fi

# Fix 5: Test local connectivity
print_status "5. Testing local connectivity..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200\|301\|302"; then
    print_success "Local HTTP works"
else
    print_error "Local HTTP failed - checking container logs..."
    docker-compose logs --tail=10
fi

# Fix 6: Check firewall (common issue)
print_status "6. Checking firewall..."
if command -v ufw &> /dev/null; then
    print_status "UFW firewall detected, ensuring ports are open..."
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    print_success "Firewall rules updated"
elif command -v firewall-cmd &> /dev/null; then
    print_status "Firewalld detected, ensuring ports are open..."
    sudo firewall-cmd --permanent --add-port=80/tcp
    sudo firewall-cmd --permanent --add-port=443/tcp
    sudo firewall-cmd --reload
    print_success "Firewall rules updated"
fi

# Final status check
print_status "7. Final status check..."
echo ""
print_status "Container status:"
docker-compose ps

echo ""
print_status "Port status:"
netstat -tlnp | grep -E ":80 |:443 "

echo ""
print_status "SSL certificate status:"
if [ -f "ssl/fullchain.pem" ]; then
    openssl x509 -in ssl/fullchain.pem -text -noout | grep -E "Subject:|Not After"
fi

echo ""
print_status "🔧 Cloudflare Settings to Check:"
echo "1. Go to Cloudflare Dashboard → SSL/TLS → Overview"
echo "2. Set Encryption mode to 'Full (strict)'"
echo "3. Go to SSL/TLS → Edge Certificates"
echo "4. Enable 'Always Use HTTPS'"
echo "5. Go to DNS → Records"
echo "6. Verify A records point to your server IP:"
echo "   - hamedelfayome.dev → $(curl -s ifconfig.me)"
echo "   - www.hamedelfayome.dev → $(curl -s ifconfig.me)"
echo "7. Make sure both records have 'Proxied' enabled (orange cloud)"

echo ""
print_status "🌐 Test your site:"
echo "HTTP:  http://hamedelfayome.dev"
echo "HTTPS: https://hamedelfayome.dev"

print_success "Quick fixes applied! 🎯"
print_warning "If still getting Error 521, check Cloudflare settings above"
