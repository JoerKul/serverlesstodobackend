const { v4 } = require('uuid');
const AWS = require('aws-sdk');

// create todo lambda function
const addTodo = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  console.log(data);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: v4(),
      todo: data.todo,
      createdAt: new Date().getTime(),
      completed: false,
    },
  };

  console.log(params);
  await dynamoDb
    .put(params, (error) => {
      if (error) {
        console.log(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: "Couldn't create the todo item.",
        });
        return;
      }

      console.log('Added todo item:', params.Item);
      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .promise();
};

module.exports = {
  handler: addTodo,
};
