import {
  ClientFactory,
  IProvider,
  ProviderType,
  WalletClient,
} from "@massalabs/massa-web3";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.SECRET_KEY) {
  throw new Error(
    'SECRET_KEY is not set. Did you create environment file ".env" ?'
  );
}

export const baseAccount = await WalletClient.getAccountFromSecretKey(
  process.env.SECRET_KEY
);

const node_net_1: Array<IProvider> = [
  {
    url: "http://127.0.0.1:33035",
    type: ProviderType.PUBLIC,
  },
  {
    url: "http://127.0.0.1:33034",
    type: ProviderType.PRIVATE,
  },
];

const node_net_2: Array<IProvider> = [
  {
    url: "http://127.0.0.1:33035",
    type: ProviderType.PUBLIC,
  },
  {
    url: "http://127.0.0.1:33034",
    type: ProviderType.PRIVATE,
  },
];

export const client1 = await ClientFactory.createCustomClient(
  node_net_1,
  true,
  baseAccount
);

export const client2 = await ClientFactory.createCustomClient(
  node_net_2,
  true,
  baseAccount
);
