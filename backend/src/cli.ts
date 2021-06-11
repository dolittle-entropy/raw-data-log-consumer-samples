import { connect } from 'node-nats-streaming';
import { runWebServer } from './webServer';
import { getDurableName, setupOnRead } from './favouriteColourTeamsIntegration';


export type RawMomentMetadata = {
  tenantId: string
  applicationId: string
  environment: string
  labels: any
}

export type RawMoment = {
  kind: string
  when: number
  metadata: RawMomentMetadata
  data: any
}

const listenOn = process.env.LISTEN_ON ? process.env.LISTEN_ON : ':8080';
const clusterId = process.env.STAN_CLUSTER_ID ? process.env.STAN_CLUSTER_ID : 'stan';
const clientId = process.env.STAN_CLIENT_ID ? process.env.STAN_CLIENT_ID : 'ts-reader';
const topic = process.env.TOPIC ? process.env.TOPIC : 'topic.todo';

let debug = false;
if (process.env.DEBUG && process.env.DEBUG === '1') {
  debug = true;
}

let dryRun = false;
if (process.env.DRY_RUN && process.env.DRY_RUN === '1') {
  dryRun = true;
}

const servers = [
  process.env.NATS_SERVER ? process.env.NATS_SERVER : 'localhost'
];


const webhookUrl = process.env.MS_TEAMS_WEBHOOK_URL as string;
const onRead = setupOnRead(webhookUrl, debug, dryRun);


runWebServer(listenOn)

const sc = connect(clusterId, clientId, {
  servers,
});


sc.on('connect', () => {
  const opts = sc.subscriptionOptions()
    .setDurableName(getDurableName())
    .setStartWithLastReceived()
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
