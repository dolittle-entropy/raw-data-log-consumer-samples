import { Message } from 'node-nats-streaming';
import { newWebhook, post } from './teams';
import { RawMoment } from './cli';
import { IncomingWebhook } from 'ms-teams-webhook';

export type FavouriteColour = {
  name: string
  colour: string
}

export const getDurableName = (): string => {
  return 'favouriteColour';
};

let teamsWebhook: IncomingWebhook;
let _debug = false;
let _dryRun = false;

const onRead = (msg: Message): void => {
  try {
    const moment: RawMoment = JSON.parse(msg.getData() as string);
    if (moment.kind !== 'favouriteColour') {
      return;
    }
    const fav: FavouriteColour = moment.data as FavouriteColour;
    if (_debug) {
      console.log(`${fav.name} submitted ${fav.colour}`);
    }

    if (!_dryRun) {
      post(teamsWebhook, fav);
    }

  } catch (e) {
    console.log(e);
  }
};


export const setupOnRead = (webhookUrl: string, debug: boolean, dryRun: boolean): any => {
  _debug = debug;
  _dryRun = dryRun;
  teamsWebhook = newWebhook(webhookUrl) as IncomingWebhook;
  return onRead;
};

