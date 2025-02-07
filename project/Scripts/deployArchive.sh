#!/bin/bash
find /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive -type f -exec touch {} +