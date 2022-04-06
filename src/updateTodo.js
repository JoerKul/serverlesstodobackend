// create update todo lambda function with specific id and return todo item
const AWS = require('aws-sdk');
// update todo lambda function with specific id and return todo item
const updateTodo = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id,
    },
    UpdateExpression: 'set todo = :todo, completed = :completed',
    ExpressionAttributeValues: {
      ':todo': data.todo,
      ':completed': data.completed,
    },
    ReturnValues: 'ALL_NEW',
  };

  const result = await dynamoDb
    .update(params, function (err, data) {
      if (err) {
        console.error(
          'Unable to update item. Error JSON:',
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
      }
    })
    .promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(result.Attributes),
  };

  callback(null, response);
};

module.exports = {
  handler: updateTodo,
};
