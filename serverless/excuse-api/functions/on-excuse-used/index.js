const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const TABLE = process.env.EXCUSE_TABLE;
const dbClient = new DynamoDBClient();

module.exports.handler = async (event) => {
  try {
    const { id } = event.detail;

    if (!id) {
      throw new Error("Missing 'id' in event.detail");
    }

    await dbClient.send(new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: "SET usedCount = if_not_exists(usedCount, :zero) + :incr",
      ExpressionAttributeValues: {
        ":incr": 1,
        ":zero": 0
      }
    }));

    return {
      statusCode: 200
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error: err.message })
    };
  }
};
