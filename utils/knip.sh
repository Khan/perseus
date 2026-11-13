#!/usr/bin/env bash

KNIP="node_modules/.bin/knip --treat-config-hints-as-errors --config knip.config.ts"

echo "✂️  Running knip..."
$KNIP
knip_status="$?"

echo "✂️  Running knip in production mode. This checks for code that is unused in production and not marked as dev-only."
$KNIP --production
knip_production_status="$?"

if [ $knip_status -ne 0 ] || [ $knip_production_status -ne 0 ]; then
    echo "❌  Knip failed. For help fixing these errors, see: https://khanacademy.atlassian.net/wiki/spaces/LC/pages/5032640623/Fixing+Knip+errors+in+Perseus"
    exit 1
fi
