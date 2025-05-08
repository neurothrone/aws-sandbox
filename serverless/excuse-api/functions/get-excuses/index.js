const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

const TABLE = process.env.EXCUSE_TABLE;
const dbClient = new DynamoDBClient();

module.exports.handler = async () => {
  try {
    const command = new ScanCommand({ TableName: TABLE });
    const { Items } = await dbClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify(Items)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal error", error: error.message })
    };
  }
};
