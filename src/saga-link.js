import { ApolloLink } from 'apollo-link';
import pubsub from 'pubsub-js';

const pubsubLink = new ApolloLink((operation, forward) => {
  const operationName = `${operation.query.definitions[0].operation}.${
    operation.operationName
  }`.toUpperCase();
  pubsub.publish(`${operationName}`, operation);
  return forward(operation).map(data => {
    const { data: result, errors } = data;
    if (errors) pubsub.publish(`${operationName}.FAIL`, errors);
    else if (data) pubsub.publish(`${operationName}.SUCESS`, result);
    return data;
  });
});

export default pubsubLink;
