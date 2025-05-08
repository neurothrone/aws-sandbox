import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

export const handler = async (event) => {
  const command = new ScanCommand({ TableName: "todos" });
  const { Items: todos } = await client.send(command);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify({ todos: todos }),
  };
}
