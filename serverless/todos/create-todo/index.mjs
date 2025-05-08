import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({ region: "eu-north-1" });

export const handler = async (event) => {
  let newTodo;
  try {
    if (!event.body) {
      throw new Error("Request body is missing");
    }
    newTodo = JSON.parse(event.body);
  } catch (parseError) {
    console.error("Error parsing request body:", parseError);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Invalid request body", error: parseError.message }),
    };
  }

  if (!newTodo || typeof newTodo.title !== "string" || newTodo.title.trim() === "") {
    console.error("Validation Error: title is missing or invalid", newTodo);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Validation Error: title is required and must be a non-empty string." }),
    };
  }

  const command = new PutItemCommand({
    TableName: "todos",
    Item: {
      pk: { S: uuidv4() },
      title: { S: newTodo.title },
      completed: { BOOL: false },
      createdAt: { S: new Date().toISOString() },
    },
  });

  try {
    await client.send(command);

    const createdItem = {
      id: command.input.Item.pk.S,
      title: newTodo.title,
      completed: false,
      createdAt: command.input.Item.createdAt.S
    };

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createdItem),
    };
  } catch (dynamoError) {
    console.error("Error creating todo in DynamoDB:", dynamoError);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Failed to create todo", error: dynamoError.message }),
    };
  }
};