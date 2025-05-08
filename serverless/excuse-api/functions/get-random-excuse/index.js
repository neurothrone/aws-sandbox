const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge");

const TABLE = process.env.EXCUSE_TABLE;
const dbClient = new DynamoDBClient();
const ebClient = new EventBridgeClient();

module.exports.handler = async () => {
  const { Items: excuses } = await dbClient.send(new ScanCommand({ TableName: TABLE }));

  if (!excuses || excuses.length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "No excuses available" })
    };
  }

  const random = excuses[Math.floor(Math.random() * excuses.length)];

  await ebClient.send(new PutEventsCommand({
    Entries: [{
      Source: "excuses.api",
      DetailType: "ExcuseUsed",
      Detail: JSON.stringify({ id: random.id })
    }]
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(random)
  };
};
