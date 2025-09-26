# 🚀 Production Deployment Guide

This portfolio uses a complete Docker-based production setup with automatic SSL certificates, reverse proxy, and zero-downtime deployments.

## 🏗️ Architecture

```
Internet → Traefik (Reverse Proxy + SSL) → Portfolio App (Nginx + React)
```

**Features:**
- ✅ Automatic SSL certificates with Let's Encrypt
- ✅ HTTPS redirection
- ✅ www to non-www redirection
- ✅ GZIP compression and asset caching
- ✅ Security headers
- ✅ Health checks
- ✅ Zero-downtime updates
- ✅ Monitoring dashboard

## 🚀 Quick Deployment

### 1. Configure Environment

```bash
# Copy environment template
cp .env.prod.template .env.prod

# Edit with your domain and email
# Required:
#   DOMAIN=yourdomain.com
#   ACME_EMAIL=your-email@example.com
```

### 2. Deploy

```bash
# Make scripts executable
chmod +x deploy.sh update.sh

# Deploy to production
./deploy.sh
```

That's it! Your site will be available at `https://yourdomain.com`

## 📁 Files Overview

### Docker Configuration
- **`docker-compose.prod.yml`** - Production services (Traefik + Portfolio)
- **`Dockerfile.prod`** - Optimized production build
- **`nginx.prod.conf`** - Production nginx configuration

### Scripts
- **`deploy.sh`** - Initial deployment script
- **`update.sh`** - Zero-downtime update script
- **`.env.prod.template`** - Environment configuration template

## 🔧 Management Commands

### View Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Portfolio only
docker-compose -f docker-compose.prod.yml logs -f portfolio

# Traefik only
docker-compose -f docker-compose.prod.yml logs -f traefik
```

### Update Application
```bash
./update.sh
```

### Stop Services
```bash
docker-compose -f docker-compose.prod.yml down
```

### Restart Services
```bash
docker-compose -f docker-compose.prod.yml restart
```

## 📊 Monitoring

### Traefik Dashboard
- **URL:** `https://traefik.yourdomain.com`
- **Username:** `admin`
- **Password:** `secure123`

**⚠️ Important:** Change the dashboard password in `docker-compose.prod.yml` for security!

### Health Checks
```bash
# Check if portfolio is healthy
curl https://yourdomain.com/health

# Check container health
docker-compose -f docker-compose.prod.yml ps
```

## 🔒 SSL Certificates

SSL certificates are automatically:
- Generated on first deployment
- Renewed every 90 days
- Stored in `./letsencrypt/` directory

**Backup:** Make sure to backup the `letsencrypt` directory to avoid rate limits.

## 🌍 DNS Configuration

Point your domain to your server:

```
A    yourdomain.com      → YOUR_SERVER_IP
A    www.yourdomain.com  → YOUR_SERVER_IP
A    traefik.yourdomain.com → YOUR_SERVER_IP  (optional, for dashboard)
```

## 🔧 Troubleshooting

### SSL Certificate Issues
```bash
# Check certificate status
docker-compose -f docker-compose.prod.yml logs traefik | grep -i acme

# Force certificate regeneration (delete and restart)
sudo rm -rf letsencrypt/acme.json
docker-compose -f docker-compose.prod.yml restart traefik
```

### Service Not Starting
```bash
# Check all logs
docker-compose -f docker-compose.prod.yml logs

# Check specific service
docker-compose -f docker-compose.prod.yml logs portfolio
docker-compose -f docker-compose.prod.yml logs traefik
```

### Port Already in Use
```bash
# Check what's using port 80/443
sudo lsof -i :80
sudo lsof -i :443

# Stop conflicting services
sudo systemctl stop nginx
sudo systemctl stop apache2
```

## 📈 Performance

The production setup includes:
- **GZIP compression** for smaller transfers
- **Asset caching** (1 year for static assets)
- **HTTP/2** for faster loading
- **Security headers** for protection
- **Optimized nginx** configuration

## 🔄 CI/CD Integration

For automated deployments, add this to your CI/CD pipeline:

```bash
# After deploying to server
ssh user@server "cd /path/to/portfolio && ./update.sh"
```

## 🆘 Support

If you encounter issues:
1. Check the logs with the commands above
2. Verify your DNS configuration
3. Ensure ports 80 and 443 are open
4. Check that your domain is pointing to the server

---

**🎉 Enjoy your production-ready portfolio!**