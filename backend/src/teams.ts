import { IncomingWebhook } from 'ms-teams-webhook';
import { FavouriteColour } from './favouriteColourTeamsIntegration';


export const newWebhook = (url: string) => {
  return new IncomingWebhook(url);
};

export const post = async (webhook: IncomingWebhook, data: FavouriteColour) => {
  await webhook.send(JSON.stringify({
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    "summary": `${data.name} likes ${data.colour}`,
    "themeColor": "0078D7",
    "title": "Did you know?",
    "sections": [
      {
        "activityTitle": `${data.name} likes ${data.colour}`,
        "text": "Tell me your favourite colour? https://freshteapot-taco.dolittle.cloud/what-is-your-favourite-colour/"
      }
    ]
  }));
};
