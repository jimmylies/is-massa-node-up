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

const baseAccount = await WalletClient.getAccountFromSecretKey(
  process.env.SECRET_KEY
);

const node_net: Array<IProvider> = [
  {
    url: "http://127.0.0.1:33035",
    type: ProviderType.PUBLIC,
  },
  {
    url: "http://127.0.0.1:33034",
    type: ProviderType.PRIVATE,
  },
];

const customClient = await ClientFactory.createCustomClient(
  node_net,
  true,
  baseAccount
);

export default customClient;