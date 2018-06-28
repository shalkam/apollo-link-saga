import pubsub from 'pubsub-js';

const runSagas = sagas => {
  sagas.forEach(({ saga, handler }) => {
    pubsub.subscribe(saga, (topic, data)=> { handler(data) });
  });
};

export default runSagas;
