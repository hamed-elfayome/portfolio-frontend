#!/bin/bash

# Troubleshooting script for Cloudflare Error 521
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

print_status "🔍 Troubleshooting Cloudflare Error 521..."

# Check if container is running
print_status "Checking if container is running..."
if docker ps | grep -q "hamed-elfayome-portfolio"; then
    print_success "Container is running"
    docker ps | grep "hamed-elfayome-portfolio"
else
    print_error "Container is not running!"
    print_status "Starting container..."
    docker-compose up -d
    sleep 5
fi

# Check container logs
print_status "Checking container logs..."
docker-compose logs --tail=20

# Check if nginx is running inside container
print_status "Checking nginx status inside container..."
if docker exec hamed-elfayome-portfolio nginx -t 2>/dev/null; then
    print_success "Nginx configuration is valid"
else
    print_error "Nginx configuration has errors!"
    docker exec hamed-elfayome-portfolio nginx -t
fi

# Check if nginx is listening on correct ports
print_status "Checking if nginx is listening on ports 80 and 443..."
if docker exec hamed-elfayome-portfolio netstat -tlnp | grep -q ":80 "; then
    print_success "Nginx is listening on port 80"
else
    print_error "Nginx is NOT listening on port 80"
fi

if docker exec hamed-elfayome-portfolio netstat -tlnp | grep -q ":443 "; then
    print_success "Nginx is listening on port 443"
else
    print_error "Nginx is NOT listening on port 443"
fi

# Check if ports are exposed on host
print_status "Checking if ports are exposed on host..."
if netstat -tlnp | grep -q ":80 "; then
    print_success "Port 80 is exposed on host"
else
    print_error "Port 80 is NOT exposed on host"
fi

if netstat -tlnp | grep -q ":443 "; then
    print_success "Port 443 is exposed on host"
else
    print_error "Port 443 is NOT exposed on host"
fi

# Test local connectivity
print_status "Testing local connectivity..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200\|301\|302"; then
    print_success "Local HTTP connection works"
else
    print_error "Local HTTP connection failed"
    curl -I http://localhost
fi

# Check SSL certificates
print_status "Checking SSL certificates..."
if [ -f "ssl/fullchain.pem" ] && [ -f "ssl/privkey.pem" ]; then
    print_success "SSL certificates exist"
    
    # Check certificate validity
    if openssl x509 -in ssl/fullchain.pem -text -noout | grep -q "hamedelfayome.dev"; then
        print_success "SSL certificate is valid for hamedelfayome.dev"
    else
        print_error "SSL certificate is NOT valid for hamedelfayome.dev"
    fi
else
    print_error "SSL certificates are missing!"
fi

# Check firewall
print_status "Checking firewall status..."
if command -v ufw &> /dev/null; then
    ufw status
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --list-all
elif command -v iptables &> /dev/null; then
    iptables -L | head -20
fi

# Check Cloudflare settings
print_status "🔧 Cloudflare Configuration Check:"
echo ""
print_warning "Please verify these Cloudflare settings:"
echo "1. DNS Records:"
echo "   - A record: hamedelfayome.dev → YOUR_SERVER_IP"
echo "   - A record: www.hamedelfayome.dev → YOUR_SERVER_IP"
echo ""
echo "2. SSL/TLS Settings:"
echo "   - Encryption mode: 'Full (strict)' or 'Full'"
echo "   - Edge Certificates: 'Always Use HTTPS' enabled"
echo ""
echo "3. Origin Server:"
echo "   - Make sure your server IP is correct"
echo "   - Check if Cloudflare is proxied (orange cloud)"
echo ""
echo "4. Network Settings:"
echo "   - Check if any firewall is blocking Cloudflare IPs"
echo "   - Verify server can accept connections on ports 80/443"

# Get server IP
print_status "Your server IP addresses:"
curl -s ifconfig.me
echo ""
hostname -I

# Test from external perspective
print_status "Testing external connectivity..."
if command -v curl &> /dev/null; then
    print_status "Testing HTTP (should redirect to HTTPS):"
    curl -I http://hamedelfayome.dev 2>/dev/null || print_warning "HTTP test failed"
    
    print_status "Testing HTTPS:"
    curl -I https://hamedelfayome.dev 2>/dev/null || print_warning "HTTPS test failed"
fi

print_status "🔧 Common fixes for Error 521:"
echo "1. Restart the container: docker-compose restart"
echo "2. Check nginx config: docker exec hamed-elfayome-portfolio nginx -t"
echo "3. Verify SSL certificates are properly mounted"
echo "4. Check Cloudflare SSL/TLS settings"
echo "5. Ensure server firewall allows ports 80/443"
echo "6. Verify DNS records point to correct server IP"

print_status "Troubleshooting complete! 🎯"
