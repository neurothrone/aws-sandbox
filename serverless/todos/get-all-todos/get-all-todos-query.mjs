import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

export const handler = async (event) => {
  const params = {
    TableName: "todos",
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": { S: "1" },
    },
  };
  const command = new QueryCommand(params);
  // const command = new QueryCommand({
  //   TableName: "todos",
  //   KeyConditionExpression: "completed = :completed",
  //   ExpressionAttributeValues: {
  //     ":completed": false,
  //   },
  // });
  const { Items: todos } = await client.send(command);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify({ todos: todos }),
  };
}
