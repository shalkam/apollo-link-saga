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
```

### 2. Start sagas

Now we have to start the listeners for our mutations/queries

#### 1. Create Sagas inside `sagas.js` file for example

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

**Sagas naming**

So, here's how to know the operation name use for a saga:
```
QUERY|MUTATION.${operationName}.PENDING|FAIL|SUCCESS`
```

1. If the operation has a name like `myMutation` then it will be used in uppercase `MYMUTATION`
 => `MUTATION.MYMUTATION`

```
mutation myMutation <-- will use this one first {
  deleteAllUsers <-- this one won't be used
}
```

2. No operation name, then will use the name of the first field in uppercase `GETUSERS`
 => `QUERY.GETUSERS`

```
query { <-- no operation name defined
  getUsers <-- so, this one will be used
}
```


#### 2. Run the sagas and start listening to graphql operations
Anywhere in your app outside react execute this function:
inside `client.js` for example

```
import { runSagas } from 'apollo-saga';
import sagas from './sagas';

runSagas(sagas);
```
