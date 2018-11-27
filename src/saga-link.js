import { ApolloLink } from 'apollo-link';
import pubsub from 'pubsub-js';

const sagaLink = new ApolloLink((operation, forward) => {
  const operationDefinition = operation.query.definitions
                .find(({kind}) => kind === "OperationDefinition");
  const name = operation.operationName || operationDefinition.selectionSet.selections[0].name.value;
  const operationName = `${operationDefinition.operation}.${name}`.toUpperCase();
  pubsub.publish(`${operationName}.PENDING`, operation);
  return forward(operation).map(data => {
    const { data: result, errors } = data;
    if (errors) pubsub.publish(`${operationName}.FAIL`, errors);
    else if (data) pubsub.publish(`${operationName}.SUCCESS`, result);
    return data;
  });
});

export default sagaLink;
