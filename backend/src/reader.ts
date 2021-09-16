import { connect } from 'node-nats-streaming';
import { Message } from 'node-nats-streaming';

type RawMomentMetadata = {
  tenantId: string
  applicationId: string
  environment: string
  labels: any
}

type RawMoment = {
  kind: string
  when: number
  metadata: RawMomentMetadata
  data: any
}



const clusterId = process.env.STAN_CLUSTER_ID ? process.env.STAN_CLUSTER_ID : 'stan';
const clientId = process.env.STAN_CLIENT_ID ? process.env.STAN_CLIENT_ID : 'ts-reader';
const topic = process.env.TOPIC ? process.env.TOPIC : 'topic.todo';

const servers = [
  process.env.NATS_SERVER ? process.env.NATS_SERVER : 'localhost'
];


// Increment to get all data
console.log(new Date(), topic);

const durableName = `test-1234-${new Date()}`;

const onRead = (msg: Message): void => {
  try {
    const moment: RawMoment = JSON.parse(msg.getData() as string);
    console.log(JSON.stringify(moment));
  } catch (e) {
    console.log(e);
  }
  msg.ack();
};


const sc = connect(clusterId, clientId, {
  servers,
});


sc.on('connect', () => {
  const opts = sc.subscriptionOptions()
    .setDurableName(durableName)
    .setDeliverAllAvailable()
    .setManualAckMode(true)
    .setMaxInFlight(1);
  const subscription = sc.subscribe(topic, opts)
  subscription.on('message', onRead);
})

sc.on('close', () => {
  process.exit()
})

process.once('SIGINT', () => {
  console.log('SIGINT received...');
  sc.close();
});

process.once('SIGTERM', () => {
  console.log('SIGTERM received...');
  sc.close();
});
