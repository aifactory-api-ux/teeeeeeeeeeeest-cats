#!/bin/bash
set -e

echo "Starting services..."

docker-compose up -d

echo "Waiting for services to be healthy..."
docker-compose ps

echo "Services started successfully!"
echo "API Service: http://localhost:23001"
echo "Swagger Docs: http://localhost:23001/docs"
echo "PostgreSQL: localhost:25432"
echo "Redis: localhost:26379"