# apollo-link-saga
apollo link for handling side-effects for graphql mutations

## Installation
`yarn add apollo-link-saga` or `npm install apollo-link-saga --save`

## Setup

### 1. Add to apollo client links

```
import { ApolloLink } from 'apollo-link';
import { sagaLink } from 'apollo-saga';

const link = ApolloLink.from([
  sagaLink,
  // ... other links for the ApolloClient goes here
]);

### 2. Start sagas

Now we have to start the listeners for our mutations/queries

1. Create Sagas inside `sagas.js` file for example

```
const sagas = [
  {
    saga: 'MUTATION.LOGIN.PENDING',
    handler: () => {
      console.log('login mutation has started')
    }
  },
  {
    saga: 'MUTATION.LOGIN.FAIL',
    handler: errors => {
      console.log(errors)
    }
  },
  {
    saga: 'MUTATION.LOGIN.SUCCESS',
    handler: (data) => {
      console.log(data)
    }
  }
];

export default sagas;
```

** Sagas naming **
So, here's how to know the operation name use for a saga:
```
QUERY|MUTATION.${operationName}.PENDING|FAIL|SUCCESS`
```

- How to find out operationName
suppose we have a mutation that looks like this:

```
mutation myMutation {
  deleteAllUsers <-- Here's the operationName
}
```
So, we will use `deleteAllUsers` in uppercase for the operationName `DELETEALLUSERS`

2. Run the sagas and start listening to graphql operations
Anywhere in your app outside react execute this function:
inside `client.js` for example

```
import { runSagas } from 'apollo-saga';
import sagas from './sagas';

runSagas(sagas);
```

And that's it.
