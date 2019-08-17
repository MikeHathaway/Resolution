#!/bin/bash

set -eu

new=$1

if [ "$new" = "true" ]; then
	node ./start.js
fi

echo "Deploying Development Blockchain"
secret=`cat .secret`
ganache-cli -m "$secret" &

echo "Deploying Smart Contracts"
truffle migrate
