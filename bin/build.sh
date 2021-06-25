#! /usr/bin/env sh
export NODE_ENV="production"
npx tsc -p tsconfig.production.json

cp ./.env ./dist