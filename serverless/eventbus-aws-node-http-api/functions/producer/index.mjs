const { EventBridge } = require("@aws-sdk/client-eventbridge");

const eventBridge = new EventBridge({ region: "eu-north-1" });

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const params = {
    Entries: [
      {
        EventBusName: "my-test-event-bus",
        Source: "order.put",
        DetailType: "createOrder",
        detail: JSON.stringify({
          id: 1,
          price: 3999,
          type: "surfboard",
          orderId: 123
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
