# Docker Deployment Guide

One-click deployment for your portfolio at `https://hamedelfayome.dev/`

## Quick Start

### 1. One-Click Deployment

```bash
./deploy.sh
```

This script will:
- Build the Docker image
- Start the container
- Configure nginx
- Set up the portfolio on port 80 and 443

### 2. SSL Setup (HTTPS)

```bash
./setup-ssl.sh
```

This script will:
- Install certbot (if needed)
- Request Let's Encrypt SSL certificates
- Configure nginx for HTTPS
- Set up automatic certificate renewal

## Manual Deployment

### Using Docker Compose

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Using Docker directly

```bash
# Build image
docker build -t hamed-elfayome-portfolio .

# Run container
docker run -d \
  --name hamed-elfayome-portfolio \
  -p 80:80 \
  -p 443:443 \
  --restart unless-stopped \
  hamed-elfayome-portfolio
```

## Configuration

### Domain Configuration

The portfolio is configured for:
- **Primary domain**: `hamedelfayome.dev`
- **WWW domain**: `www.hamedelfayome.dev`
- **HTTP redirect**: Automatically redirects to HTTPS

### SSL Certificates

SSL certificates are stored in the `ssl/` directory:
- `fullchain.pem` - Full certificate chain
- `privkey.pem` - Private key

### Nginx Configuration

The nginx configuration includes:
- **Security headers**: XSS protection, content type options, etc.
- **Gzip compression**: Optimized for performance
- **Static file caching**: 1-year cache for assets
- **SPA routing**: Handles React Router properly
- **Health check**: `/health` endpoint for monitoring

## File Structure

```
portfolio-site/
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx configuration
├── .dockerignore           # Docker ignore file
├── deploy.sh               # One-click deployment script
├── setup-ssl.sh            # SSL setup script
└── ssl/                    # SSL certificates directory
    ├── fullchain.pem
    └── privkey.pem
```

## Environment Variables

The container uses these environment variables:
- `NODE_ENV=production` - Production mode

## Ports

- **Port 80**: HTTP (redirects to HTTPS)
- **Port 443**: HTTPS
- **Port 8080**: Traefik dashboard (if using Traefik)

## Health Check

The container includes a health check endpoint:
- **URL**: `http://hamedelfayome.dev/health`
- **Response**: `healthy`

## Monitoring

### View Logs

```bash
# All logs
docker-compose logs -f

# Specific service
docker-compose logs -f portfolio
```

### Container Status

```bash
# Check status
docker-compose ps

# Container details
docker inspect hamed-elfayome-portfolio
```

## SSL Certificate Renewal

Certificates are automatically renewed via cron job:
- **Schedule**: Daily at 12:00 PM
- **Action**: Renew certificates and restart container
- **Logs**: Check `/var/log/letsencrypt/` for renewal logs

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   sudo lsof -i :80
   sudo lsof -i :443
   ```

2. **SSL certificate issues**:
   ```bash
   # Check certificate status
   sudo certbot certificates
   
   # Test SSL
   openssl s_client -connect hamedelfayome.dev:443
   ```

3. **Container won't start**:
   ```bash
   # Check logs
   docker-compose logs
   
   # Check nginx config
   docker exec hamed-elfayome-portfolio nginx -t
   ```

### Reset Everything

```bash
# Stop and remove everything
docker-compose down -v
docker system prune -a

# Rebuild from scratch
./deploy.sh
```

## Performance Optimization

### Nginx Optimizations

- **Gzip compression**: Enabled for text files
- **Static file caching**: 1-year cache for assets
- **Keep-alive**: Optimized connection handling
- **Security headers**: Comprehensive security configuration

### Docker Optimizations

- **Multi-stage build**: Smaller production image
- **Alpine Linux**: Minimal base image
- **Health checks**: Container health monitoring
- **Restart policy**: Automatic restart on failure

## Security Features

- **HTTPS enforcement**: HTTP redirects to HTTPS
- **Security headers**: XSS, CSRF, and content type protection
- **SSL/TLS**: Modern TLS 1.2 and 1.3 support
- **Hidden files**: Denied access to system files
- **CSP**: Content Security Policy headers

## Backup

### Backup SSL Certificates

```bash
# Backup certificates
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz ssl/
```

### Backup Configuration

```bash
# Backup config files
tar -czf config-backup-$(date +%Y%m%d).tar.gz \
  Dockerfile docker-compose.yml nginx.conf
```

## Updates

### Update Portfolio

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Update SSL Certificates

```bash
# Manual renewal
sudo certbot renew

# Copy new certificates
sudo cp /etc/letsencrypt/live/hamedelfayome.dev/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/hamedelfayome.dev/privkey.pem ssl/

# Restart container
docker-compose restart
```

## Support

For issues or questions:
1. Check the logs: `docker-compose logs -f`
2. Verify configuration: `docker exec hamed-elfayome-portfolio nginx -t`
3. Test connectivity: `curl -I https://hamedelfayome.dev`
4. Check SSL: `openssl s_client -connect hamedelfayome.dev:443`
