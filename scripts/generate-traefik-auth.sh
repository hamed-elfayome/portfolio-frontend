#!/bin/bash

# Generate Traefik Basic Auth Hash
# Usage: ./scripts/generate-traefik-auth.sh [username] [password]

set -e

# Default values
USERNAME=${1:-admin}
PASSWORD=${2:-secure123}

echo "🔐 Generating Traefik Basic Auth Hash..."
echo "Username: $USERNAME"
echo ""

# Check if htpasswd is available
if command -v htpasswd >/dev/null 2>&1; then
    echo "Using system htpasswd..."
    HASH=$(htpasswd -nb "$USERNAME" "$PASSWORD")
else
    echo "htpasswd not found locally, using Docker..."
    HASH=$(docker run --rm --entrypoint htpasswd registry:2 -nb "$USERNAME" "$PASSWORD")
fi

# Escape for docker-compose (double the $ signs)
ESCAPED_HASH=$(echo "$HASH" | sed 's/\$/\$\$/g')

echo "✅ Generated hash:"
echo "$HASH"
echo ""
echo "📋 For docker-compose.yml (with escaped \$):"
echo "$ESCAPED_HASH"
echo ""
echo "🔧 Add this to your .env.prod file:"
echo "TRAEFIK_AUTH_HASH=$ESCAPED_HASH"
echo "USE_TRAEFIK_AUTH_HASH=true"
echo ""
echo "💡 Or update the existing credentials:"
echo "TRAEFIK_AUTH_USER=$USERNAME"
echo "TRAEFIK_AUTH_PASSWORD=$PASSWORD"
echo "USE_TRAEFIK_AUTH_HASH=false"