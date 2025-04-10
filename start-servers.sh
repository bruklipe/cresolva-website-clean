#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Starting CreSolva Website ===${NC}"

# Function to check if a port is in use
check_port() {
  lsof -i :$1 >/dev/null 2>&1
  return $?
}

# Check if the port is already in use
if check_port 3000; then
  echo -e "${YELLOW}Warning: Port 3000 is already in use. Next.js may fail to start.${NC}"
fi

# Start the Next.js app
echo -e "${PURPLE}Starting Next.js app on port 3000...${NC}"
echo -e "${GREEN}=== Ready! ===${NC}"
echo -e "Open ${BLUE}http://localhost:3000${NC} in your browser"
echo -e "Visit ${BLUE}http://localhost:3000/contact${NC} to try the contact form"
echo -e "Press ${YELLOW}Ctrl+C${NC} to stop the server\n"

npm run dev
