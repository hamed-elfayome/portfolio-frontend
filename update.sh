#!/bin/bash

set -e

echo "= Starting zero-downtime update..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if services are running
if ! docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo -e "${RED}L Services not running! Use ./deploy.sh for initial deployment.${NC}"
    exit 1
fi

echo -e "${YELLOW}=æ Pulling latest changes...${NC}"
git pull origin main || echo -e "${YELLOW}   Git pull skipped (not in git repo)${NC}"

echo -e "${YELLOW}=( Building new image...${NC}"
docker-compose -f docker-compose.prod.yml --env-file .env.prod build portfolio

echo -e "${YELLOW}= Performing zero-downtime update...${NC}"
# Recreate only the portfolio container
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --no-deps portfolio

echo -e "${YELLOW}ó Waiting for new container to be ready...${NC}"
sleep 10

# Health check
if docker-compose -f docker-compose.prod.yml ps | grep -q "portfolio.*Up"; then
    echo -e "${GREEN} Update successful!${NC}"

    # Clean up old images
    echo -e "${YELLOW}>ù Cleaning up old images...${NC}"
    docker image prune -f

    echo -e "${GREEN}<‰ Portfolio updated successfully!${NC}"
else
    echo -e "${RED}L Update failed! Rolling back...${NC}"
    docker-compose -f docker-compose.prod.yml --env-file .env.prod logs portfolio
    exit 1
fi