import {
  CHAIN_ID,
  ClientFactory,
  IProvider,
  ProviderType,
  // WalletClient,
} from "@massalabs/massa-web3";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.WALLET_ADDRESS) {
  throw new Error(
    'WALLET_ADDRESS is not set. Did you create environment file ".env" ?'
  );
}

export const walletAddress = process.env.WALLET_ADDRESS;

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
  CHAIN_ID.MainNet,
  true
);

export default customClient;
