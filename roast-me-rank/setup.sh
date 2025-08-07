#!/bin/bash

# This script sets up the RoastMe application for development or production

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up RoastMe application...${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install Node.js and npm first.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    cp .env.local.example .env.local
    echo -e "${GREEN}Created .env.local file. Please update it with your Supabase credentials.${NC}"
    echo -e "${YELLOW}You need to add your Supabase URL, anon key, and service role key to .env.local${NC}"
else
    echo -e "${GREEN}.env.local file already exists.${NC}"
fi

# Check if user wants to start development server
read -p "Do you want to start the development server? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Starting development server...${NC}"
    npm run dev
fi

echo -e "${GREEN}Setup complete!${NC}"
echo -e "${YELLOW}Make sure to update your .env.local file with your Supabase credentials.${NC}"
echo -e "${YELLOW}Run 'npm run dev' to start the development server.${NC}"
npm install

# Check if .env.local exists, if not, create it from .env.example
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        echo -e "${YELLOW}Creating .env.local from .env.example...${NC}"
        cp .env.example .env.local
        echo -e "${GREEN}.env.local created. Please update it with your Supabase credentials.${NC}"
    else
        echo -e "${RED}.env.example not found. Creating a basic .env.local file...${NC}"
        cat > .env.local << EOF
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Next Auth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Optional: Application configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
        echo -e "${GREEN}Basic .env.local created. Please update it with your Supabase credentials.${NC}"
    fi
else
    echo -e "${GREEN}.env.local already exists. Skipping creation.${NC}"
fi

# Build the application
echo -e "${YELLOW}Building the application...${NC}"
npm run build

# Instructions for running the app
echo -e "${GREEN}Setup complete!${NC}"
echo -e "${YELLOW}To run the development server:${NC} npm run dev"
echo -e "${YELLOW}To run the production server:${NC} npm start"
echo -e "${YELLOW}To deploy using Docker:${NC} docker-compose up -d"
echo -e "\n${GREEN}For more information, check the README.md and DEPLOYMENT.md files.${NC}"
