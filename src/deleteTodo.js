const AWS = require('aws-sdk');

// create delete todo lambda function with specific id and return todo item
const deleteTodo = async (event, context, callback) => {
  const id = event.pathParameters.id;
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: id,
    },
  };

  const result = await dynamoDb
    .delete(params, function (err, data) {
      if (err) {
        console.error(
          'Unable to delete item. Error JSON:',
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log('DeleteItem succeeded:', JSON.stringify(id, null, 2));
      }
    })
    .promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };

  callback(null, response);
};

module.exports = {
  handler: deleteTodo,
};
