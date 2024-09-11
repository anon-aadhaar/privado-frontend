#!/bin/bash
set -ex

ISSUER_URL="https://issuer-anon-aadhaar.pse.dev"

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 490752553772.dkr.ecr.eu-central-1.amazonaws.com

docker build --build-arg "NEXT_PUBLIC_ISSUER_URL=$ISSUER_URL" -t anon-aadhaar-client -f client/Dockerfile client
docker tag anon-aadhaar-client:latest 490752553772.dkr.ecr.eu-central-1.amazonaws.com/anon-aadhaar-client:latest
docker push 490752553772.dkr.ecr.eu-central-1.amazonaws.com/anon-aadhaar-client:latest

docker build -t anon-aadhaar-issuer .
docker tag anon-aadhaar-issuer:latest 490752553772.dkr.ecr.eu-central-1.amazonaws.com/anon-aadhaar-issuer:latest
docker push 490752553772.dkr.ecr.eu-central-1.amazonaws.com/anon-aadhaar-issuer:latest

exit 0
