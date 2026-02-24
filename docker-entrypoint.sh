#!/bin/sh
set -e

# Create a runtime env file that the frontend reads: window.__ENV.API_URL
API_URL=${API_URL:-http://localhost:3000}
cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV = { API_URL: "${API_URL}" };
EOF

exec "$@"
