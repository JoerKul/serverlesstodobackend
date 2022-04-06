const AWS = require('aws-sdk');

const fetchTodos = async (event, context, callback) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  const result = await dynamoDb.scan(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };

  callback(null, response);
};

module.exports = {
  handler: fetchTodos,
};
