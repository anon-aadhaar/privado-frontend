#!/bin/bash
set -ex

tasks="anon-aadhaar-client anon-aadhaar-issuer"
for task in $tasks; do
  anon_aadhaar_revision=$(aws ecs describe-task-definition --task-definition $task --query "taskDefinition.revision")
  aws ecs update-service --cluster anon-aadhaar --service $task --force-new-deployment --task-definition $task:$anon_aadhaar_revision
done

for loop in {1..3}; do
  [ "$loop" -eq 3 ] && exit 1
  aws ecs wait services-stable --cluster anon-aadhaar --services $tasks && break || continue
done
