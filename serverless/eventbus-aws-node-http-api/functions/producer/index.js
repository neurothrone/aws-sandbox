const { EventBridge } = require("@aws-sdk/client-eventbridge");

const eventBridge = new EventBridge({ region: "eu-north-1" });

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const params = {
    Entries: [
      {
        //EventBusName: "default",
        Source: "my.test.event",
        DetailType: "myCustomEvent",
        detail: JSON.stringify({
          message: body.message,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  };

  try {
    await eventBridge.putEvents(params);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event sent!" }),
    };
  } catch (error) {
    console.log("Error sending event:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send event" }),
    };
  }
};
