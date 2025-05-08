# Serverless

## Notes

- We need the policy `AWSCodeDeployRoleForCloudFormation` to be able to deploy with serverless.
- Lambda requires the policy `AmazonDynamoDBFullAccess` to interface with DynamoDB.

## Commands

```shell
# Deploy all functions, create/update CloudFormation stack and resources
sls deploy

# Remove all functions, delete CloudFormation stack and resources
sls remove

# Redeploys only that that Lambda (much faster)
sls logs -f functionName

# Test the function and immediately view logs
sls invoke -f functionName --log
```
