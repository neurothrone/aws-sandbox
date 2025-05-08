const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const TABLE = process.env.EXCUSE_TABLE;
const dbClient = new DynamoDBClient();

module.exports.handler = async (event) => {
  const { text } = JSON.parse(event.body);
  const item = {
    id: uuidv4(),
    text,
    usedCount: 0
  };

  await dbClient.send(new PutCommand({ TableName: TABLE, Item: item }));

  return {
    statusCode: 201,
    body: JSON.stringify(item)
  };
};
