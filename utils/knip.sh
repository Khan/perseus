#!/usr/bin/env bash

echo "✂️  Running knip..."
node_modules/.bin/knip --config knip.config.ts
knip_status="$?"

echo "✂️  Running knip in production mode. This checks for code that is unused in production and not marked as dev-only."
node_modules/.bin/knip --production --config knip.config.ts
knip_production_status="$?"

if [ $knip_status -ne 0 ] || [ $knip_production_status -ne 0 ]; then
    echo "❌  Knip failed. For help fixing these errors, see: https://khanacademy.atlassian.net/wiki/spaces/LC/pages/5032640623/Fixing+Knip+errors+in+Perseus"
    exit 1
fi
