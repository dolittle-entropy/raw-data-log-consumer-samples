import express, { Application } from 'express';
import path from 'path';



export const runWebServer = (listenOn: string): void => {
  const app: Application = express();

  app.use("/", express.static(path.join(__dirname, "public"), { maxAge: 0 }));
  const parts = listenOn.split(":");
  const port = parts[1];
  const host = parts[0];

  app.listen(port, host, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at ${listenOn}`);
  });
}
