// fetch todo lambda function with specific id and return todo item

const AWS = require('aws-sdk');

const fetchTodo = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id,
    },
  };

  const result = await dynamoDb.get(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };

  callback(null, response);
};

module.exports = {
  handler: fetchTodo,
};
