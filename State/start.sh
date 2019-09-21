#!/bin/bash

set -eu

new=$1

if [ "$new" = "true" ]; then
	node ./start.js
	
	npm i -g ganache-cli
fi

echo "Deploying Development Blockchain"
secret=`cat .secret`
ganache-cli -m "$secret" &

echo "Deploying Smart Contracts"
truffle migrate
